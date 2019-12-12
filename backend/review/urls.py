from django.urls import path
from . import views

urlpatterns = [
    path('<int:reviewee_id>/', views.user_review, name='user_review'),
    path('rating/<int:reviewee_id>/', views.rating, name='rating'),
]
