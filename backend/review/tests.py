#-*- coding:utf-8 -*-
from django.test import TestCase, Client
from django.contrib.auth.models import User

class ReviewTestCase(TestCase):
    def test_review(self):
        client = Client()

        # no such api
        response = client.delete('/review/1/')
        self.assertEqual(response.status_code, 405)

        # test not logged in
        response = client.get('/review/1/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/review/1/', {}, content_type='application/json')
        self.assertEqual(response.status_code, 401)

        User.objects.create_user(username='user1', password='pass')
        client.login(username='user1', password='pass')

        response = client.get('/review/10/')
        self.assertEqual(response.status_code, 404)

        response = client.post('/review/10/', {'content': '리뷰'}, content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/review/1/', {}, content_type='application/json')
        self.assertEqual(response.status_code, 400)

        valid_data = [
            {'content': '전혀 믿을 수 없는 친구입니다.'},
            {'content': '빨리 갚아서 고맙다 친구야'},
            {'content': '다음부턴 절대로 안 빌려줄 거다... 최악이야'},
        ]

        for data in valid_data:
            response = client.post('/review/1/', data, content_type='application/json')
            self.assertEqual(response.status_code, 201)

        response = client.get('/review/1/')
        self.assertEqual(response.status_code, 200)

    def test_rating(self):
        client = Client()

        # no such api
        response = client.delete('/review/rating/1/')
        self.assertEqual(response.status_code, 405)

        # test not logged in
        response = client.get('/review/rating/1/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/review/rating/1/', {}, content_type='application/json')
        self.assertEqual(response.status_code, 405)

        User.objects.create_user(username='user1', password='pass')
        client.login(username='user1', password='pass')

        response = client.get('/review/rating/10/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/review/rating/1/')
        self.assertEqual(response.status_code, 200)
