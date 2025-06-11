from django.db import models

# Create your models here.
from django.db import models

class UserRegistration(models.Model):
    email = models.EmailField(unique=True)
    discord_id = models.CharField(max_length=100, blank=True, null =True)
    referral_source = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
