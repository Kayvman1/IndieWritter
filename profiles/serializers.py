from rest_framework import serializers
from django.conf import settings
from .models import Profile
class PublicProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only = True)
    last_name = serializers.SerializerMethodField(read_only = True)
    username = serializers.SerializerMethodField(read_only = True)
    following_count = serializers.SerializerMethodField(read_only = True)
    follower_count = serializers.SerializerMethodField(read_only = True)
    is_following = serializers.SerializerMethodField(read_only = True)


    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "id",
            "bio", 
            "location",
            "follower_count",
            "following_count",
            "username",
            "is_following"
        ]

    def get_is_following(self,obj):
        context = self.context 
        request = context.get("request")
        if request:
            user = request.user
            return user in obj.followers.all()
        return False
    def get_first_name(self, obj):
        return obj.user.first_name
    def get_last_name(self,obj):
        return obj.user.last_name
    def get_username(self, obj):
        return obj.user.username

    def get_follower_count(self, obj):
        return obj.followers.count()
    def get_following_count(self, obj):
        return obj.user.following.count()

 
class FollowSerializer(serializers.ModelSerializer):
    following_count = serializers.SerializerMethodField(read_only = True)
    follower_count = serializers.SerializerMethodField(read_only = True)
    following_list = serializers.SerializerMethodField(read_only = True)
    follower_list = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = Profile
        fields = [
            "follower_count",
            "following_count",
            "follower_list",
            "following_list"
        ]

    def get_follower_count(self, obj):
        return obj.followers.count()
    def get_following_count(self, obj):
        return obj.user.following.count()
    def get_following_list(self, obj):
        dataraw = list(obj.user.following.all())
        return followingListCleanUp(dataraw)
        # obj.followers.all()
    def get_follower_list(self, obj):
        dataraw = list(obj.followers.all())
        return followerListCleanUp(dataraw)
    
def followingListCleanUp(raw):
    clean = []
    for x in raw :
        scrubbed = x.user.username
        clean.append(scrubbed)
    return clean

def followerListCleanUp(raw):
    clean = []
    for x in raw :
        scrubbed = x.username 
        clean.append(scrubbed)
    return clean