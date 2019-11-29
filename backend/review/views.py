#-*- coding:utf-8 -*-
import json
import os
from json import JSONDecodeError
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    JsonResponse,
)
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
import tensorflow as tf
from konlpy.tag import Okt
import nltk
from . import sentiment as sent
from .models import Review


def user_review(request, reviewee_id):
    if request.method not in ['GET', 'POST']:
        return HttpResponseNotAllowed(['GET', 'POST'])

    if request.user.is_authenticated:
        if request.method == 'GET':
            reviewee_user = get_object_or_404(User, pk=reviewee_id)
            # reviewee_user = User.objects.get(id=reviewee_id)
            review_list = Review.objects.filter(reviewee=reviewee_user)

            json_review_list = []
            for review in review_list:
                json_review_list.append({'rating': review.rating,
                                         'content': review.content})
            return JsonResponse(json_review_list, status=200, safe=False)


        # when request.method == 'POST':
        reviewee_user = get_object_or_404(User, pk=reviewee_id)

        try:
            req_data = json.loads(request.body.decode())
            content = req_data['content']
        except (KeyError, TypeError, ValueError, JSONDecodeError):
            return HttpResponse(status=400)

        # sentiment analysis
        model_path = os.path.join(os.getcwd(), 'review', 'nsmc', 'sentiment_model.h5')
        model = tf.keras.models.load_model(model_path)

        docs_path = os.path.join(os.getcwd(), 'review', 'nsmc', 'train_docs.json')
        with open(docs_path) as file:
            train_docs = json.load(file)

        tokens = [t for d in train_docs for t in d[0]]
        text = nltk.Text(tokens, name='NMSC')
        okt = Okt()
        selected_words = [f[0] for f in text.vocab().most_common(10000)]
        rating = sent.predict_score(model, okt, selected_words, content)

        new_review = Review(reviewee=reviewee_user,
                            rating=rating,
                            content=content)
        new_review.save()
        return JsonResponse({'id': new_review.id,
                             'rating': rating,
                             'content': content},
                            status=201)

    # If user is not logged in
    return HttpResponse(status=401)
