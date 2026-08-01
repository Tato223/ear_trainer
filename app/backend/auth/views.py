from api.serializers import UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


User = get_user_model()

# Create your views here.
@api_view(['POST'])
def sign_up(request):
    
    if request.method != 'POST':
        return Response(status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(request.data)
    if serializer.is_valid():
        
        new_user = User.objects.create_user(
            username=request.data.get("username"),
            email=request.data.get("email"),
            password=request.data.get("password")
        )
        
        serializer.save()
        return Response(data=new_user, status=status.HTTP_201_CREATED)
    
    return Response(status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    
    if request.method != 'POST':
        return Response(status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(request.data)
    
    if serializer.is_valid():
        
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(
            username=username,
            password=password
        )
        
        if user is not None:
            login(request, user)
            return Response(user, status.HTTP_200_OK)
        
        else:
            return Response(status.HTTP_401_UNAUTHORIZED)