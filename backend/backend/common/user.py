from typing import Tuple, Any
from django.contrib.auth import get_user

from backend.users.models import RizeUser


def get_current_user(request, context)-> Tuple[Any, RizeUser]:
    user = get_user(request)
    if request.user.is_authenticated:
        context['current_user'] = user
    else:
        user = None
        context['current_user'] = None
    return context, user