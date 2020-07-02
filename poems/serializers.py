from rest_framework import serializers
from django.conf import settings
from .models import Poem
from profiles.serializers import PublicProfileSerializer

MAX_TITLE_LEN = settings.MAX_TITLE_LEN
POEM_ACTIONS_OPTIONS = settings.POEM_ACTIONS_OPTIONS

class PoemActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank = True, required = False)

   # title = serializers.CharField(allow_blank = True, required = False)
    def validate_action(self, value):

        value = value.lower().strip()
        if not value in POEM_ACTIONS_OPTIONS:
            raise serializers.ValidationError("Unrecognized action")
        return value




class PoemCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source = 'user.profile', read_only = True)
    likes = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Poem
        fields = ['user','id','title', 'content', 'likes', 'timestamp']

    
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
    
    def get_user(self, obj):
        return obj.user.id

 

class PoemSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source = 'user.profile', read_only = True)
    likes = serializers.SerializerMethodField(read_only = True)
    parent = PoemCreateSerializer (read_only = True)
    #is_repub = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Poem
        fields = [
            'user',
            'id',
            'title', 
            'content', 
            'likes',
            'parent',
            'is_repub',
            'timestamp']
    
    def get_likes(self, obj):
        return obj.likes.count()

    def get_user(self, obj):
        return obj.user.id

 