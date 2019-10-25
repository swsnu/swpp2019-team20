"""Django admin

In this module, you need to declare the models that you want to see in the Django admin page.
"""

from django.contrib import admin
from .models import Profile

admin.site.register(Profile)
