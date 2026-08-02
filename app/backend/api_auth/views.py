from api.serializers import UserSerializer
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from .serializers import SignUpSerializer, UserSelfSerializer

User = get_user_model()

# MODEL VIEWSETS

class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    
# VIEWS

class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        
        if serializer.is_valid():
            
            user = serializer.create(validated_data=serializer.validated_data)
            
            return Response(UserSelfSerializer(user).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
        
            username = request.data.get('username')
            password = request.data.get('password')

            user = authenticate(username=username, password=password)
            
            if user is None:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MeView(APIView):
    queryset = User.objects.all()
    serializer_class = UserSelfSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserSelfSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        
        user = request.user
        if user is not None:
          
            serializer = UserSelfSerializer(user, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)