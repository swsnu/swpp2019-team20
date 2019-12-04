# Generated by Django 2.2.6 on 2019-12-03 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_auto_20191102_1056'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='twilio_msg',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]