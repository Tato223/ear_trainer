from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CustomUser(AbstractUser):

    def __str__(self):
        return f"Username: {self.username}"


class Category(models.TextChoices):
    PITCH_RECOGNITION = "pitch_recognition", "Pitch Recognition"
    SCALES = "scales", "Scales"
    INTERVALS = "intervals", "Intervals"
    INTONATION = "intonation", "Intonation"


class HighScore(models.Model):
    value = models.IntegerField(default=0)

    owned_by = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="Owner"
    )

    category = models.CharField(
        max_length=100, choices=Category.choices, default=Category.PITCH_RECOGNITION
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["owned_by", "category"],
                name="unique_highscore_per_user_category",
            )
        ]

    def __str__(self) -> str:
        return f"High Score: {self.value} by {str(self.owned_by)}"
