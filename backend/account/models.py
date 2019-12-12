"""Django Model
Define Models for account APIs
"""

from django.db import models
#from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
#from imagekit.models import ProcessedImageField
#from imagekit.processors import Thumbnail

#import datetime


class Profile(models.Model):
    """Profile Model
    This model extends the Django User model
    """
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    kakao_id = models.CharField(max_length=20)
    phone = models.CharField(max_length=13)
    bio = models.TextField(max_length=500, blank=True, null=True)
    twilio_msg = models.CharField(max_length=200, blank=True, null=True)
    rating = models.FloatField(default=0, blank=True, null=True)
    profile_img = models.ImageField(upload_to="profile_img", blank=True) #http://t1.kakaocdn.net/kakaofriends_global/common/SNS.jpg
    #profile_img = ProcessedImageField(blank=True, null=True,
    #                            upload_to='profile_imgs',
    #                            processors=[Thumbnail(300, 300)],
    #                            format='JPEG',
    #                            options={'quality': 60}, )

    def __str__(self):
        return f'{self.user.username}'


# pylint: disable=unused-argument
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
# pylint: enable=unused-argument
