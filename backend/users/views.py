import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

from django.conf import settings
from .models import RizeUser
import stripe
from django.core.handlers.wsgi import WSGIRequest
from django.contrib.auth.hashers import make_password

@csrf_exempt
def register_new_user(request):
  context = {}
  if request.method != 'POST':
    return JsonResponse({'error': 'Invalid request method. POST method expected.'}, status=400)

  email = request.POST.get('email').lower()
  first_name = request.POST.get('first_name').lower()
  last_name = request.POST.get('last_name').lower()
  password = request.POST.get('password')

  if RizeUser.objects.filter(email=email).exists():
    context['error'] = 'email already exists'
    return JsonResponse(context)
  elif ' ' in email:
    context['error'] = 'email can not contain spaces'
    return JsonResponse(context)
  elif not first_name:
    context['error'] = 'first name is required'
    return JsonResponse(context)
  elif not last_name:
    context['error'] = 'last name is required'
    return JsonResponse(context)
  elif not password:
    context['error'] = 'password is required'
    return JsonResponse(context)
  # stripe.api_key = settings.STRIPE_SECRET_KEY
  # create a stripe customer for each user
  # stripe_customer = stripe.Customer.create(
  #     name=username,
  #     email=request.POST['email'],
  # )
  user_data = RizeUser(
     username=email,
    email=email,
    password=make_password(password),
    first_name=first_name,
    last_name=last_name,
    # stripe_customer_id=user_stripe.id,
  )
  user_data.save()
  user = authenticate(username=email, password=password)
  auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
  context['success'] = True
  return JsonResponse(context)


@csrf_exempt
def login(request: WSGIRequest):
    response = HttpResponse()
    context = {}
    data = json.loads(request.body)
    if 'email' in data:
        try:
            user = RizeUser.objects.get(email__iexact=data['email'])
        except:
            return JsonResponse({"error" : "invalid email"})  
    else:
        return JsonResponse({"error" : "no email provided"})  
    email = data['email']
    password = data['password']
    user = authenticate(username=email, password=password)
    if user is not None:
      auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
      return response
    else: 
      context['error'] = 'invalid email/password'
      return JsonResponse(context)

def logout(request: WSGIRequest):
    if request.user.is_authenticated:
        auth_logout(request)
    return HttpResponse({'success': True})