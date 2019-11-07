from django.contrib import admin
from .models import Loan
from .models import Transaction

admin.site.register(Loan)
admin.site.register(Transaction)
