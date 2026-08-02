from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.SignUpView.as_view(), name="sign_up"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("me/", views.MeView.as_view(), name="me"),
]