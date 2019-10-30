from django.shortcuts import render, redirect

from django.contrib import messages

#from django.contrib.auth.models import User

from django.contrib.auth import login, authenticate, logout

from django.http import HttpResponse
#from django.http import HttpResponse, JsonResponse

#from .models import Profile

from django.contrib.auth.decorators import login_required

from django.urls.base import reverse

from django.http.response import HttpResponseRedirect

from .forms import SignUpForm, SignInForm


def index(request):
    #return HttpResponse("Account page")
    return render(request, 'account/index.html')


def signup(request):
    # if it is POST request, register a new user with the info in UserForm
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid(): #and profile_form.is_valid():
            user = form.save()
            user.refresh_from_db()   # load the profile instance created

            user.profile.kakao_id = form.cleaned_data.get('kakao_id')
            user.profile.phone = form.cleaned_data.get('phone')
            user.profile.bio = form.cleaned_data.get('bio')
            user.save()

            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)

            messages.success(request, 'Your profile is successfully saved.')
            return redirect('index')

        messages.error(request, 'Please correct the error below.')
    else:
        form = SignUpForm()
        #profile_form = ProfileForm(instance=request.user.profile)
    return render(request, 'account/signup.html', {'form':form})

def signin(request):
    if request.method == "POST":
        form = SignInForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        return HttpResponse('Login failed. Try again.')

    form = SignInForm()

    return render(request, 'account/signin.html', {'form': form})


def signout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


@login_required
def mypage(request):
    return render(request, 'account/mypage.html')
