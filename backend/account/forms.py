from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
#from .models import Profile

class SignUpForm(UserCreationForm):
    kakao_id = forms.CharField(help_text="maximum length: 20")
    phone = forms.CharField(help_text="010-xxxx-xxxx")
    bio = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'kakao_id', 'phone']


class SignInForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = User
        fields = ['username', 'password']
