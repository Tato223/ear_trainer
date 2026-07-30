from rest_framework import serializers
from .models import User, HighScore

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ['id', 'username', 'hashed_password', 'email']
        
class HighScoreSerializer(serializers.ModelSerializer):
    class Meta():
        model = HighScore
        fields: list = ['value', 'owned_by']