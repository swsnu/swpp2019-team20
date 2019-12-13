import datetime
from django.utils import timezone
from django.core.management.base import BaseCommand
from django.db.models import Q
from loan.models import Transaction
from utils import twilio

class Command(BaseCommand):
    # pylint: disable=unused-argument
    def handle(self, *args, **kwargs):
        now = timezone.now()
        last_time = now - datetime.timedelta(seconds=20)
        unpaid = Transaction.objects.filter(completed=False).filter(
            Q(notified_date=None) | Q(notified_date__lte=last_time)
        ).select_related()

        for tsx in unpaid:
            tsx.notified_date = now

            msg = f'YOUR TRANSACTION WITH {tsx.lender.first_name} IS OVERDUE, PLEASE PAY UP'
            twilio.send_message(tsx.borrower.profile.phone, msg)

            tsx.save()
