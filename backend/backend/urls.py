from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('account/', include('account.urls')),
    path('loan/', include('loan.urls')),
    path('review/', admin.site.urls),
    path('admin/', admin.site.urls),
]
