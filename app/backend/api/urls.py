from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.user_list, name="user_list"),
    path(
        "highscores/",
        views.HighScoreView.as_view(),
        name="HighScoreView",
    ),
    path(
        "users/<str:username>/",
        views.UserView.as_view(),
        name="UserView",
    ),
    path(
        "users/<str:username>/highscore/",
        views.UserHighScoreView.as_view(),
        name="UserHighScoreView",
    ),
    path(
        "users/<str:username>/highscores/",
        views.AllUserHighScoreView.as_view(),
        name="AllUserHighScoreView",
    ),
]
