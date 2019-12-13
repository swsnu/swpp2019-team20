# Generated by Django 2.2 on 2019-12-13 16:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('progress_rate', models.FloatField(default=0)),
                ('num_members', models.PositiveSmallIntegerField()),
                ('deadline', models.DateTimeField()),
                ('total_money', models.DecimalField(decimal_places=0, max_digits=10)),
                ('alert_frequency', models.CharField(max_length=16)),
                ('apply_interest', models.BooleanField()),
                ('interest_type', models.CharField(max_length=16, null=True)),
                ('interest_rate', models.FloatField(null=True)),
                ('completed', models.BooleanField()),
                ('expected_date', models.DateTimeField(null=True)),
                ('completed_date', models.DateTimeField(null=True)),
                ('registered_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('money', models.DecimalField(decimal_places=0, max_digits=10)),
                ('completed', models.BooleanField()),
                ('completed_date', models.DateTimeField(null=True)),
                ('notified_date', models.DateTimeField(null=True)),
                ('lender_confirm', models.BooleanField()),
                ('borrower_confirm', models.BooleanField()),
                ('borrower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='borrowed_transaction', to=settings.AUTH_USER_MODEL)),
                ('lender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lended_transaction', to=settings.AUTH_USER_MODEL)),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='loan.Loan')),
            ],
        ),
    ]
