from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.user_list, name="user_list"),
    path("highscores/", views.HighScoreView.as_view(), name = "highscores")
]