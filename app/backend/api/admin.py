from django.contrib import admin
from .models import User, HighScore

# Register your models here.
admin.site.register(User)
admin.site.register(HighScore)
