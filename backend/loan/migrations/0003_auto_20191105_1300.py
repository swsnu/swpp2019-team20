# Generated by Django 2.2.6 on 2019-11-05 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loan', '0002_auto_20191101_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='completed_date',
            field=models.DateTimeField(null=True),
        ),
    ]
