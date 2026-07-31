from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import JsonResponse
from .models import HighScore
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, HighScoreSerializer

# Create your views here.

User = get_user_model()

@api_view(http_method_names=["GET", "POST"])
def user_list(request):

    if request.method == "GET":
        all_users = User.objects.all()
        serializer = UserSerializer(all_users, many=True)
        return JsonResponse({"data": serializer.data})

    if request.method == "POST":
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():

            User.objects.create_user(
                username=request.data.get("username"),
                email=request.data.get("email"),
                password=request.data.get("password"),
            )

            serializer.save()
            return JsonResponse({"data": serializer.data})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=["GET", "POST"])
def highscores_list(request):

    if request.method == "GET":
        all_highscores = HighScore.objects.all()
        serializer = HighScoreSerializer(all_highscores, many=True)
        return JsonResponse({"data": serializer.data})

    if request.method == "POST":
        serializer = HighScoreSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"data": serializer.data})

    return Response(status=status.HTTP_400_BAD_REQUEST)
