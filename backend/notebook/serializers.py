from rest_framework import serializers
from .models import Note, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
    
    def validate_title(self, title):
        if len(title) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long")
        return title
    
    def validate_description(self, description):
        if len(description) < 5:
            raise serializers.ValidationError("Description must be at least 5 characters long")
        return description

