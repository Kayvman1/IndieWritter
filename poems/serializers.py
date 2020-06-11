from rest_framework import serializers
from django.conf import settings
from .models import Poem

MAX_TITLE_LEN = settings.MAX_TITLE_LEN
POEM_ACTIONS_OPTIONS = settings.POEM_ACTIONS_OPTIONS

class PoemActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    
    def validate_action(self, value):
        value = value.lower().strip()
        if not value in POEM_ACTIONS_OPTIONS:
            raise serializers.ValidationError("Unrecognized action")
        return value

class PoemSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Poem
        fields = ['id','title', 'content', 'likes']
    
    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if 'bitch' in value:
            raise serializers.ValidationError("Explicit Langauge")
        return value
    
    def validate_title(self, value):
        if len(value) > settings.MAX_TITLE_LEN:
            raise serializers.ValidationError("Your Title is Too Long")
        return value