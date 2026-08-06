from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import HighScore

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    class Meta():
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {
            "password" : {
                'write_only' : True,
                'style' : {'input-type' : 'password'}
            }
        }
        
class HighScoreSerializer(serializers.ModelSerializer):
    
    owned_by = serializers.ReadOnlyField(source='owned_by.username')
    
    class Meta():
        model = HighScore
        fields = ['value', 'owned_by']