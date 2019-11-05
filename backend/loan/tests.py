#import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from .models import Loan

# Create your tests here.

class LoanTestCase(TestCase):
    def test_loan(self):
        client = Client()

        # test - no such api
        response = client.delete('/loan/loan')
        self.assertEqual(response.status_code, 405)

        # test - not logged in
        response = client.post('/loan/loan')
        self.assertEqual(response.status_code, 401)

        # login
        User.objects.create_user(username='username', password='password')
        client.login(username='username', password='password')

        # test - get
        response = client.get('/loan/loan')
        self.assertEqual(response.status_code, 200)

        # test - no request body
        response = client.post('/loan/loan')
        self.assertEqual(response.status_code, 400)

        # test - body is not json
        response = client.post('/loan/loan',
                               'This is a string',
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # make invalid data array
        invalid_data = [
            {'participants': None,
             'deadline': '2019-12-31T23:59:59Z', 'interest_rate': 1.5,
             'interest_type': 'day', 'alert_frequency': 'high'},
            {'participants': [{'id': 1, 'paid_money': 50}, {'id': 2, 'paid_money': 100}],
             'deadline': None, 'interest_rate': 1.5,
             'interest_type': 'day', 'alert_frequency': 'high'},
            {'participants': [{'id': 1, 'paid_money': 50}, {'id': 2, 'paid_money': 100}],
             'deadline': '2019-12-31T23:59:59Z', 'interest_rate': None,
             'interest_type': 'day', 'alert_frequency': 'high'},
            {'participants': [{'id': 1, 'paid_money': 50}, {'id': 2, 'paid_money': 100}],
             'deadline': '2019-12-31T23:59:59Z', 'interest_rate': 1.5,
             'interest_type': None, 'alert_frequency': 'high'},
            {'participants': [{'id': 1, 'paid_money': 50}, {'id': 2, 'paid_money': 100}],
             'deadline': '2019-12-31T23:59:59Z', 'interest_rate': 1.5,
             'interest_type': 'day', 'alert_frequency': None},
        ]

        # test - invalid input data
        for invalid_datum in invalid_data:
            response = client.post('/loan/loan',
                                   invalid_datum,
                                   content_type='application/json')
            self.assertEqual(response.status_code, 400)

        #make valid data
        valid_data = {'participants': [{'id': 1, 'paid_money': 50}, {'id': 2, 'paid_money': 100}],
                      'deadline': '2019-12-31T23:59:59Z', 'interest_rate': 1.5,
                      'interest_type': 'day', 'alert_frequency': 'high'}

        # test - valid input data
        response = client.post('/loan/loan',
                               valid_data,
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # test - correct data
        try:
            loan = Loan.objects.get()
        except ObjectDoesNotExist:
            self.fail("The data is not stored")
        if loan.total_money != 150:
            self.fail("The data is not stored correctly")
