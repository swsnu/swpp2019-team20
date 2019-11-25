from django.db import models
from django.contrib.auth.models import User


class Review(models.Model):
    """Review Model
    For User 2 User Feedback System,
    which includes free text and evaluated credit rating.
    """
    # reviewer = models.ForeignKey(User, related_name='reviewer', on_delete=models.CASCADE)
    reviewee = models.ForeignKey(User, related_name='reviewee',on_delete=models.CASCADE)
    rating = models.FloatField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
