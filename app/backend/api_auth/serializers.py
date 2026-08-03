from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    
class UserSelfSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
        read_only_fields = ['id']
    
    
class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

        
class LoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }