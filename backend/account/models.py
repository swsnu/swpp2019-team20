"""Django Model
Define Models for account APIs
"""

from django.db import models
#from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

#import datetime

class Profile(models.Model):
    """Profile Model
    This model extends the Django User model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    kakao_id = models.CharField(max_length=20)
    phone = models.CharField(max_length=13)
    bio = models.TextField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """If User instance is created, Profile instance that extends the User
    also should be created
    """
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save the Profile instance created
    """
    instance.profile.save()

    def __str__(self):
        return self.user.username
