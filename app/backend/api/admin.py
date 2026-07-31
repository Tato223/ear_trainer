from django.contrib import admin
from .models import HighScore, CustomUser

# Register your models here.
admin.site.register(HighScore)
admin.site.register(CustomUser)
