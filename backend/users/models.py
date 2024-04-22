from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

# Create your models here.

class RizeUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    email=models.EmailField(
        max_length=200,
        unique=True
    )
    date_of_birth = models.DateField(null=True)
    email_verified = models.BooleanField(default=False)
    first_name = models.CharField(
        max_length=20,
        default='',
        null=True,
    )
    last_name = models.CharField(
        max_length=20,
        default='',
        null=True,
    )
    stripe_customer_id = models.CharField(
        max_length=200,
        null=True,
    )
    intercom_hash = models.CharField(
        null=True,
        max_length=200,
    )
    def __str__(self):
        return self.username
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:  
            self.date_joined = timezone.now()
        return super().save(*args, **kwargs) # In Python 3, you can just use super() without arguments