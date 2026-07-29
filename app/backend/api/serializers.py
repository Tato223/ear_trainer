from rest_framework import serializers
from .models import User, HighScore
from typing import Annotated

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ['id', 'username', 'email']
        
class HighScoreSerializer(serializers.ModelSerializer):
    class Meta():
        model = HighScore
        fields: list = ['value', 'owned_by']