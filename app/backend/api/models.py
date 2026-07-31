from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    
    def __str__(self):
        return f"Username: {self.username}"
    
class HighScore(models.Model):
    value = models.IntegerField(default=0)
    
    owned_by = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name="Owner"
        )
    
    def __str__(self) -> str:
        return f"High Score: {self.value} by {str(self.owned_by)}"