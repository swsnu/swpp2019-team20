"""Django Form for Account Management
Todo:
     Since we will make the form template from the frontend side, this page
      need to be deleted afterwards
"""

from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
#from .models import Profile

# pylint: disable=too-few-public-methods
class SignUpForm(UserCreationForm):
    """SignUpForm
    This is the Django signup form for the users
    """

    kakao_id = forms.CharField(help_text="maximum length: 20")
    phone = forms.CharField(help_text="010-xxxx-xxxx")
    bio = forms.CharField(widget=forms.Textarea)


    class Meta:
        """
        In this class Defne a model and fields that you want to use in the form
        """

        model = User
        fields = ['username', 'email', 'password1', 'password2', 'kakao_id', 'phone']
# pylint: enable=too-few-public-methods


# pylint: disable=too-few-public-methods
class SignInForm(forms.ModelForm):
    """SignInForm
    This is the Django signin form for the users
    """

    password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        """
        In this class Defne a model and fields that you want to use in the form
        """

        model = User
        fields = ['username', 'password']
# pylint: enable=too-few-public-methods
