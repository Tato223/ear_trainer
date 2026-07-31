from rest_framework import serializers
from .models import HighScore, CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = CustomUser
        fields = ['id', 'username', 'password', 'email']
        
class HighScoreSerializer(serializers.ModelSerializer):
    
    owned_by = serializers.ReadOnlyField(source='owned_by.username')
    
    class Meta():
        
        model = HighScore
        fields = ['value', 'owned_by']