from django.urls import path
from . import views

urlpatterns = [
    path("", views.user_list, name="user_list"),
    path("", views.highscores_list, name="highcsores_list")
]