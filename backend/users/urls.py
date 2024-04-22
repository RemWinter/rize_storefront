from django.urls import path, include

from . import views

urlpatterns = [
  path('api/register', views.register_new_user),
  path('api/login', views.login),
  path('api/logout', views.logout),
]