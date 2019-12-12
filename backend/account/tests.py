import json
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Profile


# Create your tests here.
class AccountTestCase(TestCase):
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
        response = client.post('/account/signup', {},
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)  # Pass csrf protection, but invalid data

    def test_signup(self):
        client = Client()

        # get is not allowed request method
        response = client.get('/account/signup')
        self.assertEqual(response.status_code, 405)     # Request not allowed

        # invalid data
        response = client.post('/account/signup', {}, content_type='application/json')
        self.assertEqual(response.status_code, 400)

        signup_data = {
            'username': 'user',
            'password': 'user_password',
            'first_name': 'Firstname',
            'last_name': 'Lastname',
            'email': 'user@snu.ac.kr',
            'kakao_id':'user',
            'phone':'010-1234-5678',
            'bio':'Hi. I am user1',
            'profile_pic':'/profile/pic/location.jpg',
        }

        # valid user
        response = client.post('/account/signup', signup_data, content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # duplicate user
        response = client.post('/account/signup', signup_data, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signin(self):
        client = Client()
        User.objects.create_user(username='chris', password='chris')

        response = client.post('/account/signin', {}, content_type='application/json')
        self.assertEqual(response.status_code, 400)

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
        client = Client()
        user = User.objects.create_user(username='chris', password='chris')

        response = client.post('/account/by-name/chris', {}, content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.get('/account/by-name/chris')
        self.assertEqual(response.status_code, 401)

        client.login(username='chris', password='chris')

        response = client.get('/account/by-name/notexisting')
        self.assertEqual(response.status_code, 404)

        response = client.get('/account/by-name/chris')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': user.id})

    def test_user_login(self):
        client = Client()
        User.objects.create_user(username='chris', password='chris')

        response = client.get('/account/user')
        self.assertEqual(response.status_code, 401)

        # Succesful request
        response = client.post('/account/signin',
                               json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get('/account/user')
        self.assertEqual(response.status_code, 204)

        response = client.delete('/account/user')
        self.assertEqual(response.status_code, 405)     # Request not allowed

class ProfileTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user1 = User.objects.create_user(username='bill', password='evans')
        self.user_profile = Profile(user=self.user1,
                                    kakao_id="billKakao",
                                    phone="12345",
                                    bio="i'am bill")
        self.user_profile.save()
        self.user2 = User.objects.create_user(username='ming', password='ming')
        self.user2_profile = Profile(user=self.user2,
                                     kakao_id="mingKakao",
                                     phone="6789",
                                     bio="i'am ming")
        self.user2_profile.save()

    def test_model(self):
        self.assertEqual(self.user_profile.__str__(), "bill")

    def test_profile(self):
        # test - no such api
        response = self.client.post('/account/user/1')
        self.assertEqual(response.status_code, 405)
        response = self.client.delete('/account/user/1')
        self.assertEqual(response.status_code, 405)

        # test - not logged in
        response = self.client.get('/account/user/1')
        self.assertEqual(response.status_code, 401)
        response = self.client.put('/account/user/1')
        self.assertEqual(response.status_code, 401)

        # login
        self.client.login(username='bill', password='evans')
        response = self.client.get('/account/user/1')
        self.assertEqual(response.status_code, 200)

        # test - no request body
        response = self.client.put('/account/user/1')
        self.assertEqual(response.status_code, 400)

        # test - body is not json
        response = self.client.put('/account/user/1',
                                   'This is a string',
                                   content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # make valid data
        valid_data = {
            'kakao_id': 'newkaka',
            'phone': '010-2222-2222',
            'bio': "hello, I am bill",
            'twilio_msg': "give me money",
        }

        # test - valid data
        response = self.client.put('/account/user/1',
                                   valid_data,
                                   content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # make invalid data
        invalid_data = list()
        invalid_data.append({'kakao_id': None})
        invalid_data.append({'phone': None})
        invalid_data.append({'bio': None})

        # test - invalid input data
        for invalid_datum in invalid_data:
            response = self.client.put('/account/user/1',
                                       invalid_datum,
                                       content_type='application/json')
            self.assertEqual(response.status_code, 400)

        # test - other user's profile
        response = self.client.put('/account/user/2',
                                   valid_data,
                                   content_type='application/json')
        self.assertEqual(response.status_code, 403)

    def test_profile_image(self):

        def make_image_file():
            '''
                method that make fake image file
            '''
            file_obj = BytesIO()
            img = Image.new('RGB', (60, 30), color='red')
            img.save(file_obj, 'png')
            file_obj.seek(0)
            file = File(file_obj, name='test.png')
            return (img, file)

        client = Client()

        # test - no such api
        response = self.client.get('/account/user/1/image')
        self.assertEqual(response.status_code, 405)

        # test - not logged in
        response = self.client.post('/account/user/1/image')
        self.assertEqual(response.status_code, 401)
        response = self.client.delete('/account/user/1/image')
        self.assertEqual(response.status_code, 401)

        # login
        self.client.login(username='bill', password='evans')

        # test - no request body
        response = self.client.post('/account/user/1/image')
        self.assertEqual(response.status_code, 400)

        # test - put valid image
        response = self.client.post('/account/user/1/image',
                                   data={'image': make_image_file()[1]})
        self.assertEqual(response.status_code, 200)

        # I have image!
        response = self.client.get('/account/user/1')
        self.assertEqual(response.status_code, 200)

        # test - delete image
        response = self.client.delete('/account/user/1/image')
        self.assertEqual(response.status_code, 200)


    def test_profile_me(self):
        client = Client()

        response = client.post('/account/user/me', {}, content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = client.get('/account/user/me')
        self.assertEqual(response.status_code, 401)

        user = User.objects.get(username='bill')
        client.login(username=user.username, password='evans')

        response1 = client.get('/account/user/me')
        self.assertEqual(response1.status_code, 200)

        response2 = client.get(f'/account/user/{user.id}')
        self.assertEqual(response2.status_code, 200)

        self.assertEqual(response1.json(), response2.json())
