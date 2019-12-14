from django.db import models
from django.contrib.auth.models import User


class Loan(models.Model):
    progress_rate = models.FloatField(default=0)
    num_members = models.PositiveSmallIntegerField()
    deadline = models.DateTimeField()
    total_money = models.DecimalField(max_digits=10, decimal_places=0)
    alert_frequency = models.CharField(max_length=16)
    apply_interest = models.BooleanField()
    interest_type = models.CharField(max_length=16, null=True)
    interest_rate = models.FloatField(null=True)
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
    money = models.DecimalField(max_digits=10, decimal_places=0)
    completed = models.BooleanField()
    completed_date = models.DateTimeField(null=True)
    notified_date = models.DateTimeField(null=True)
    lender_confirm = models.BooleanField()
    borrower_confirm = models.BooleanField()
