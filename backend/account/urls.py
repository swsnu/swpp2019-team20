from django.urls import path

from . import views

urlpatterns = [
    #path('', views.index, name='index'),
    path('token', views.token, name='token'),
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name='signin'),
    path('signout', views.signout, name='signout'),
<<<<<<< HEAD
    path('by-name/<str:username>', views.by_name, name='by name'),
=======
>>>>>>> a6f4d5a950d554cb7470866490a2a2b214e7653d
    path('user/<int:pk>/', views.profile, name='profile'),
]
