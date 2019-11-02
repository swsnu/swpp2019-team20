import json

# from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.forms.models import model_to_dict

from .models import Profile

# from django.contrib.auth.decorators import login_required

# from django.urls.base import reverse

# from django.http.response import HttpResponseRedirect

# from .forms import SignUpForm, SignInForm


def profile(request, user_pk):
    """This is for showing or updating user's Profile

    GET: get specific user
        :param user_pk - user id
        :return User info on JsonResponse format or HttpResponse for Error control

    PUT: Change personal info
        :param request example - {
                                    "kakao_id": "mingkakao",
                                    "phone": "010-1234-1234",
                                    "bio": "hello, I am ming"
                                 }
        :param user_pk - user id
        :return User info on JsonResponse format or HttpResponse for Error control
    """
    prof = get_object_or_404(Profile, pk=user_pk)
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        dict_profile = model_to_dict(prof)
        json_profile = json.dumps(dict_profile)
        return JsonResponse(json_profile, safe=False)
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            if 'kakao_id' in req_data:
                kakao_id = req_data['kakao_id']
                if kakao_id:
                    setattr(prof, 'kakao_id', kakao_id)
                else:
                    return HttpResponseBadRequest()
            if 'phone' in req_data:
                phone = req_data['phone']
                if phone:
                    setattr(prof, 'phone', phone)
                else:
                    return HttpResponseBadRequest()
            if 'bio' in req_data:
                bio = req_data['bio']
                if bio:
                    setattr(prof, 'bio', bio)
                else:
                    return HttpResponseBadRequest()
            if request.user.pk != prof.user_id:
                return HttpResponse(status=403)
            prof.save()
            dict_article = model_to_dict(prof)
            json_article = json.dumps(dict_article)
            return JsonResponse(json_article, safe=False)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])

# def signup(request):
# if it is POST request, register a new user with the info in UserForm
#    if request.method == "POST":
#        form = SignUpForm(request.POST)
#        if form.is_valid(): #and profile_form.is_valid():
#           user = form.save()
#            user.refresh_from_db()   # load the profile instance created
#
#            user.profile.kakao_id = form.cleaned_data.get('kakao_id')
#            user.profile.phone = form.cleaned_data.get('phone')
#            user.profile.bio = form.cleaned_data.get('bio')
#            user.save()

#            raw_password = form.cleaned_data.get('password1')
#            user = authenticate(username=user.username, password=raw_password)
#            login(request, user)

#            messages.success(request, 'Your profile is successfully saved.')
#            return redirect('index')

#        messages.error(request, 'Please correct the error below.')
#    else:
#        form = SignUpForm()
# profile_form = ProfileForm(instance=request.user.profile)
#    return render(request, 'account/signup.html', {'form':form})

def signup(request):
    """
    PUT method will be required afterward in order to update the user rating
    (Or deal with this in another api)
    """
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        email = req_data['email']
        user = User.objects.create_user(username=username, email=email, password=password)
        user.refresh_from_db()  # load the profile instance created
        user.profile.kakao_id = req_data['kakao_id']
        user.profile.phone = req_data['phone']
        user.profile.bio = req_data['bio']
        user.profile.profile_pic = req_data['profile_pic']
        user.save()

        return HttpResponse(status=201)

    return HttpResponseNotAllowed(['POST'])


# def signin(request):
#    if request.method == "POST":
#        form = SignInForm(request.POST)
#        username = request.POST['username']
#        password = request.POST['password']
#        user = authenticate(username=username, password=password)
#        if user is not None:
#            login(request, user)
#            return redirect('index')
#        return HttpResponse('Login failed. Try again.')

#    form = SignInForm()

#    return render(request, 'account/signin.html', {'form': form})


def signin(request):
    if request.method == "POST":
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            # request was responded successfully but without any content
            return HttpResponse(status=204)

        return HttpResponse(status=401)  # unauthorized

    return HttpResponseNotAllowed(['POST'])


# def signout(request):
#    logout(request)
#    return HttpResponseRedirect(reverse('index'))

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)

        return HttpResponse(status=401)

    return HttpResponseNotAllowed(['GET'])

def by_name(request, username=None):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])

    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    return JsonResponse({'id': user.id})
