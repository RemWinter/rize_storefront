from django.urls import path, include

from . import views

urlpatterns = [
  path('api/register', views.register_new_user),
  path('api/login', views.login),
  path('api/logout', views.logout),
  path('api/get_initial_user_info', views.get_initial_user_info),
  path('webhook/kommo/', views.kommo_webhook, name='kommo-webhook'),
  path('api/process_message_with_ai/', views.process_message_with_AI),
  path('api/updateAssistantSettings/', views.updateAssistantSettings),
  path('api/calc_net_sal', views.calculate_net_pay),
]