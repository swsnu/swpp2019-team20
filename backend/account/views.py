import json

#from django.shortcuts import render, redirect

#from django.contrib import messages

from django.contrib.auth.models import User

from django.contrib.auth import login, authenticate, logout

from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

#from .models import Profile

#from django.contrib.auth.decorators import login_required

#from django.urls.base import reverse

#from django.http.response import HttpResponseRedirect

#from .forms import SignUpForm, SignInForm

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)

    return HttpResponseNotAllowed(['GET'])

#def signup(request):
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
        #profile_form = ProfileForm(instance=request.user.profile)
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
        user.refresh_from_db()   # load the profile instance created
        user.profile.kakao_id = req_data['kakao_id']
        user.profile.phone = req_data['phone']
        user.profile.bio = req_data['bio']
        user.profile.profile_pic = req_data['profile_pic']
        user.save()

        return HttpResponse(status=201)

    return HttpResponseNotAllowed(['POST'])


#def signin(request):
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

        return HttpResponse(status=401)     # unauthorized

    return HttpResponseNotAllowed(['POST'])



#def signout(request):
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
