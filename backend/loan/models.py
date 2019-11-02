from django.db import models
#from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

#class Deposit(models.Model):
#    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
#    money = models.DecimalField(max_digits=8, decimal_places=2)
#    date = models.DateTimeField(auto_now_add=True)


class Loan(models.Model):
    num_members = models.PositiveSmallIntegerField()
    deadline = models.DateTimeField()
    total_money = models.DecimalField(max_digits=8, decimal_places=2)
    alert_frequency = models.CharField(max_length=16)
    apply_interest = models.BooleanField()
    interest_type = models.CharField(max_length=16, null=True)
    interest_rate = models.FloatField()
    completed = models.BooleanField()
    expected_date = models.DateTimeField(null=True)
    completed_date = models.DateTimeField(null=True)
    registered_date = models.DateTimeField(auto_now_add=True)


class Transaction(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    lender = models.ForeignKey(User, on_delete=models.CASCADE,
                               related_name='lended_transaction')
    borrower = models.ForeignKey(User, on_delete=models.CASCADE,
                                 related_name='borrowed_transaction')
    money = models.DecimalField(max_digits=8, decimal_places=2)
    completed = models.BooleanField()
    completed_date = models.DateTimeField()
    lender_confirm = models.BooleanField()
    borrower_confirm = models.BooleanField()
