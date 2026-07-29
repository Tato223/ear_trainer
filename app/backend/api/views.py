from django.shortcuts import render
from django.http import JsonResponse
from .models import User, HighScore
from rest_framework.decorators import api_view
from .serializers import UserSerializer, HighScoreSerializer

# Create your views here.

@api_view(http_method_names=['GET'])
def read_users(request):
    
    all_users = User.objects.all()
    serializer = UserSerializer(all_users, many=True)
    return JsonResponse({"data": serializer.data})

def read_highscores(request):
    
    all_highscores = HighScore.objects.all()
    serializer = HighScoreSerializer(all_highscores, many=True) 
    return JsonResponse({"data": serializer.data})