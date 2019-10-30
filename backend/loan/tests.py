import json
from django.test import TestCase, Client
from django.contrib.auth.models import User

# Create your tests here.

class LoanTestCase(TestCase):
    def test_loan(self):
        client = Client()

        # test - no such api
        response = client.delete('/loan')
        self.assertEqual(response.status_code, 405)

        # test - not logged in
        response = client.post('/loan')
        self.assertEqual(response.status_code, 401)

        # login
        User.objects.create_user(username='username', password='password')
        client.login(username='username', password='password')

        # test - no request body
        response = client.post('/loan')
        self.assertEqual(response.status_code, 400)

        # test - body is not json
        response = client.post('/loan',
                               'This is a string',
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # make invalid data array
        invalid_data = [
            { 'participants': None, 'due_date': '2019-10-30T23:09:31Z', 'interest_rate': 1.5, 'interest_type': 'day', 'alert_frequency': 'high' },
            { 'participants': [ {'id': 1, 'paid_money': 500}, {'id': 2, 'paid_money': 1000} ], 'due_date': None, 'interest_rate': 1.5, 'interest_type': 'day', 'alert_frequency': 'high' },
            { 'participants': [ {'id': 1, 'paid_money': 500}, {'id': 2, 'paid_money': 1000} ], 'due_date': '2019-10-30T23:09:31Z', 'interest_rate': None, 'interest_type': 'day', 'alert_frequency': 'high' },
            { 'participants': [ {'id': 1, 'paid_money': 500}, {'id': 2, 'paid_money': 1000} ], 'due_date': '2019-10-30T23:09:31Z', 'interest_rate': 1.5, 'interest_type': None, 'alert_frequency': 'high' },
            { 'participants': [ {'id': 1, 'paid_money': 500}, {'id': 2, 'paid_money': 1000} ], 'due_date': '2019-10-30T23:09:31Z', 'interest_rate': 1.5, 'interest_type': 'day', 'alert_frequency': None },
        ]

        # test - no participants
        for invalid_datum in invalid_data:
            response = client.post('/loan',
                                invalid_datum,
                                content_type='application/json')
            self.assertEqual(response.status_code, 400)
        



        

        """
        response = client.post('/account/signin',
                               json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
        """