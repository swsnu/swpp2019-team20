# Generated by Django 2.2 on 2019-12-13 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loan', '0005_loan_num_completed_tx'),
    ]

    operations = [
        migrations.AddField(
            model_name='loan',
            name='progress_rate',
            field=models.FloatField(default=0),
        ),
    ]
