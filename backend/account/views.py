#-*- coding:utf-8 -*-
import json

from django.db import DataError, IntegrityError
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.forms.models import model_to_dict
from .models import Profile

def profile(request, user_pk):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        prof = get_object_or_404(Profile, pk=user_pk)

        dict_profile = model_to_dict(prof)
        dict_profile['username'] = prof.user.username
        dict_profile['id'] = dict_profile['user']
        del dict_profile['user']
        if dict_profile['profile_img'] == '':
            dict_profile['profile_img'] = ''
        else:
            dict_profile['profile_img'] = 'http://127.0.0.1:8000' + prof.profile_img.url
        return JsonResponse(dict_profile)

    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        prof = get_object_or_404(Profile, pk=user_pk)

        try:
            req_data = json.loads(request.body)
            prof.kakao_id = str(req_data['kakao_id'])
            prof.phone = str(req_data['phone'])
            prof.bio = str(req_data['bio'])
            prof.twilio_msg = str(req_data['twilio_msg'])
            if request.user.pk != prof.user_id:
                return HttpResponse(status=403)
            prof.save()
            dict_article = model_to_dict(prof)
            del dict_article['profile_img']
            return JsonResponse(dict_article)
        except (KeyError, TypeError, json.JSONDecodeError):
            return HttpResponseBadRequest()

    return HttpResponseNotAllowed(['GET', 'PUT'])

def profile_image(request, user_pk):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        prof = get_object_or_404(Profile, pk=user_pk)

        try:
            prof.profile_img.delete(save=True)
            prof.profile_img = request.FILES['image']
            prof.save()
            dict_image = {
                'image': 'http://127.0.0.1:8000' + prof.profile_img.url
            }
            return JsonResponse(dict_image)
        except (KeyError, TypeError, json.JSONDecodeError):
            return HttpResponseBadRequest()

    if request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
    
        prof = get_object_or_404(Profile, pk=user_pk)

        prof.profile_img.delete(save=True)
        return HttpResponse(status=200)

    return HttpResponseNotAllowed(['POST', 'DELETE'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])

def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body)
            username = str(req_data['username'])
            password = str(req_data['password'])
            first_name = str(req_data['first_name'])
            last_name = str(req_data['last_name'])
            email = str(req_data['email'])
            kakao_id = str(req_data['kakao_id'])
            phone = str(req_data['phone'])

        except (KeyError, TypeError, json.JSONDecodeError):
            return HttpResponseBadRequest()

        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name)
        except (DataError, IntegrityError):
            return HttpResponseBadRequest()

        user.refresh_from_db() # load the profile instance created
        user.profile.kakao_id = kakao_id
        user.profile.phone = phone
        user.save()

        return HttpResponse(status=201)

    return HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method == "POST":
        try:
            req_data = json.loads(request.body)
            username = str(req_data['username'])
            password = str(req_data['password'])
        except (KeyError, TypeError, json.JSONDecodeError):
            return HttpResponseBadRequest()

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['GET'])


def by_name(request, username=None):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return HttpResponse(status=404)

        return JsonResponse({'id': user.id})

    return HttpResponseNotAllowed(['GET'])

def profile_me(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        return profile(request, user_pk=request.user.id)

    return HttpResponseNotAllowed(['GET'])

def user_login(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponse(status=204)

        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['GET'])
