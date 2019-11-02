import json
from django.test import TestCase, Client
from django.contrib.auth.models import User


# Create your tests here.
class AccountTestCase(TestCase):
    '''
    def signup(request):
        if request.method == 'POST':
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            email = req_data['email']
            user = User.objects.create_user(username, password, email)
            user.refresh_from_db()   # load the profile instance created
            user.profile.kakao_id = req_data['kakao_id']
            user.profile.phone = req_data['phone']
            user.profile.bio = req_data['bio']
            user.profile.profile_pic = req
            user.save()

            return HttpResponse(status=201)

        else:
            return HttpResponseNotAllowed(['POST'])
    '''

    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/account/signup',
                               json.dumps({'username':'user',
                                           'password':'user_password',
                                           'email':'user@snu.ac.kr',
                                           'kakao_id':'user',
                                           'phone':'010-1234-5678',
                                           'bio':'Hi. I am user1',
                                           'profile_pic':'/profile/pic/location.jpg'}),
                               content_type='application/json')
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)

        # delete is not allowed method for CSRF
        response = client.get('/account/token')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.delete('/account/token', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # Successfully get csrftoken
        response = client.get('/account/token')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        # sinup with csrf token
        response = client.post('/account/signup',
                               json.dumps({'username': 'user',
                                           'password': 'user_password',
                                           'email': 'user@snu.ac.kr',
                                           'kakao_id':'user',
                                           'phone':'010-1234-5678',
                                           'bio':'Hi. I am user1',
                                           'profile_pic':'/profile/pic/location.jpg'}),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

        # get is not allowed request method
        response = client.get('/account/signup')
        self.assertEqual(response.status_code, 405)     # Request not allowed

    def test_signin(self):
        client = Client()
        User.objects.create_user(username='chris', password='chris')

        # Succesful request
        response = client.post('/account/signin',
                               json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.post('/account/signin',
                               json.dumps({'username': 'brown', 'password': 'brown'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # GET is not allowed request method
        response = client.get('/account/signin')
        self.assertEqual(response.status_code, 405)     # Request not allowed

    def test_signout(self):
        client = Client()
        User.objects.create_user(username='chris', password='chris')
        # Try to signout before login
        response = client.get('/account/signout')
        self.assertEqual(response.status_code, 401)

        # Successfully signout after login
        response = client.post('/account/signin',
                               json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
        response = client.get('/account/signout')
        self.assertEqual(response.status_code, 204)

        response = client.delete('/account/signout')
        self.assertEqual(response.status_code, 405)     # Request not allowed

    def test_by_name(self):
        client = self.client

        # set up
        user = User.objects.create_user(username='user', password='pass')

        # wrong method
        response = client.post('/account/by-name/name')
        self.assertEqual(response.status_code, 405)

        # not authenticated
        response = client.get('/account/by-name/chris')
        self.assertEqual(response.status_code, 401)

        # log in
        client.login(username='user', password='pass')

        # not valid
        response = client.get('/account/by-name/not-existing')
        self.assertEqual(response.status_code, 404)

        # valid
        response = client.get('/account/by-name/user')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': user.id})
