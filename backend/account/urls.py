from django.urls import path

from . import views

urlpatterns = [
    path('token', views.token, name='token'),
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name='signin'),
    path('signout', views.signout, name='signout'),
    path('signout', views.signout, name='signout'),
    path('by-name/<str:username>', views.by_name, name='by name'),
    path('user/me', views.profile_me, name='profile-me'),
    path('user/<int:user_pk>', views.profile, name='profile'),
    path('user', views.user_login, name='user')
]
