from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=18, unique=True, default="Guest", editable=True)
    hashed_password = models.CharField(max_length=255)
    email = models.EmailField(editable=True)
    
    def __str__(self) -> str:
        return f"User: {self.username}"
    
class HighScore(models.Model):
    value = models.IntegerField(default=0)
    owned_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return f"High Score: {self.value} by {self.owned_by}"