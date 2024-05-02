import json
import os
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2 import service_account
import pickle
from openai import AssistantEventHandler, OpenAI
from typing_extensions import override
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

from django.conf import settings
from .models import RizeUser
# import stripe
from django.core.handlers.wsgi import WSGIRequest
from django.contrib.auth.hashers import make_password
from django.views.decorators.http import require_http_methods

def get_current_user_data(context, user:RizeUser):
   context['email'] = user.email
   context['first_name'] = user.first_name
   context['last_name'] = user.last_name
   context['is_staf'] = user.is_staff
   return context

@csrf_exempt
def register_new_user(request):
  context = {}
  if request.method != 'POST':
    return JsonResponse({'error': 'Invalid request method. POST method expected.'}, status=400)

  email = request.POST.get('email').lower()
  first_name = request.POST.get('firstName').lower()
  last_name = request.POST.get('lastName').lower()
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
  context = get_current_user_data(context, user)
  return JsonResponse(context)


@csrf_exempt
def login(request: WSGIRequest):
    context = {}
    email = request.POST.get('email').lower()
    password = request.POST.get('password')
    try:
        user = RizeUser.objects.get(email__iexact=email)
    except:
        return JsonResponse({"error" : "invalid email"})  
    user = authenticate(username=email, password=password)
    if user is not None:
      auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
      context['success'] = True
      return JsonResponse(context)
    else: 
      context['error'] = 'incorrect password'
      return JsonResponse(context)

def logout(request: WSGIRequest):
    if request.user.is_authenticated:
        auth_logout(request)
    return HttpResponse({'success': True})

@csrf_exempt  # Disable CSRF protection for this view
@require_http_methods(["POST"])  # Only allow POST requests
def kommo_webhook(request):
    try:
        print(request)
        print(request.POST)
        for key, value in request.POST.items():
            print(f'{key}: {value}')
        # Load JSON data from the request body
        webhook_data = json.loads(request.body.decode('utf-8'))
        print("Received webhook data:", webhook_data)  # Log the webhook data

        # Here you can add your logic based on the webhook data
        # For example, processing messages, updating CRM records, etc.

        return JsonResponse({"status": "success", "message": "Webhook received"}, status=200)
    except json.JSONDecodeError:
        return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)

class EventHandler(AssistantEventHandler):
    def __init__(self):
        super().__init__()  # Initialize the base class
        self.response_buffer = []  # Initialize a list to store response parts

    @override
    def on_text_created(self, text) -> None:
        # Initially set up to print, we can also append text to the buffer here if needed
        print(f"\nassistant > ", end="", flush=True)

    @override
    def on_text_delta(self, delta, snapshot):
        # Instead of printing, append the delta value to the buffer
        self.response_buffer.append(delta.value)

    def on_tool_call_created(self, tool_call):
        # Handle tool call creation
        print(f"\nassistant > {tool_call.type}\n", flush=True)

    def on_tool_call_delta(self, delta, snapshot):
        # Handle updates from tool calls
        if delta.type == 'code_interpreter':
            if delta.code_interpreter.input:
                self.response_buffer.append(delta.code_interpreter.input)
            if delta.code_interpreter.outputs:
                for output in delta.code_interpreter.outputs:
                    if output.type == "logs":
                        self.response_buffer.append(output.logs)

    def get_full_response(self):
        # Join all parts of the response stored in the buffer and return them
        return ''.join(self.response_buffer)


@csrf_exempt
def process_message_with_AI(request: WSGIRequest):
  context = {}
  user_msg = request.POST.get('userMsg')
  thread_id = request.POST.get('threadId')
   # Path to your credentials file
  CREDENTIALS_FILE = 'fitwith-407023-e0210ba1ed62.json'

  # If modifying these SCOPES, delete the file token.pickle.
  SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
  creds = None
  token_pickle_path = 'token.pickle'
  
  if os.path.exists(token_pickle_path):
    with open(token_pickle_path, 'rb') as token:
      creds = pickle.load(token)

  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      creds = service_account.Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)

    # Save the credentials for the next run
    with open(token_pickle_path, 'wb') as token:
      pickle.dump(creds, token)

  service = build('sheets', 'v4', credentials=creds)  # Ensure this is correct
  # try:
  sheet_id = '199D94TLl11sWb4VaElquX2Hj7UzpA3dtcLPrm_PrkaA'
  range_name = 'Sheet1!A1:B2'
  sheet = service.spreadsheets().values().get(spreadsheetId=sheet_id, range=range_name).execute()
  values = sheet.get('values', [])
  system_prompt = None
  if not values:
    print('No data found.')
  else:
    for i, row in enumerate(values):
      # print(row)
      if i == 1:
        system_prompt = row[0]
        # user_msg = row[1]
        print(f'System Prompt: {system_prompt}')
        print(f'User message: {user_msg}')
    client = OpenAI()

    print(thread_id)
    print(thread_id)
    print(thread_id)

    if thread_id:
      thread_message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_msg,
      )

    else:
      if system_prompt:
        thread = client.beta.threads.create(
          messages=[
            {"role": "assistant", "content": system_prompt},
            {"role": "user", "content": user_msg}
          ],
        )
      else:
         thread = client.beta.threads.create(
          messages=[
            {"role": "user", "content": user_msg}
          ],
        )
      thread_id = thread.id

    event_handler = EventHandler()

    with client.beta.threads.runs.stream(
      thread_id=thread_id,
      assistant_id='asst_WQ4gZTCItqyuYUeS1ccpOJFt',
      event_handler=event_handler,
    ) as stream:
      stream.until_done()
    
    reply = event_handler.get_full_response()
    print("Full AI Response:", reply)

  # print(thread.choices[0].message)
  import pprint
  pprint.pprint(reply)
  context['reply'] = reply
  context['threadId'] = thread_id
  return JsonResponse(context)
# except Exception as e:
#     print(f"An error occurred: {e}")
#     context['error'] = True
#     return JsonResponse(context)


@csrf_exempt
def updateAssistantSettings(request: WSGIRequest):
  context = {}
  instructions = request.POST.get('instructions')
  if instructions == '':
     instructions = None
  temperature = float(request.POST.get('temperature'))
  client = OpenAI()
  my_updated_assistant = client.beta.assistants.update(
      "asst_WQ4gZTCItqyuYUeS1ccpOJFt",
      instructions=instructions,
      temperature=temperature
    )
  context['success'] = True
  return JsonResponse(context)