import random
import ast

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from ..models import Profile


User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

@api_view (['GET','POST']) #client must send post
@permission_classes ([IsAuthenticated])
def user_follow_view (request,username,*args, **kwargs):
    me = request.user
    print("---------------------------------------------------------------------")
    print("follow view")
    print("---------------------------------------------------------------------")
    them_qs = User.objects.filter(username = username)
    if them_qs.exists == False:
        return Response({}, status = 400)
    them = them_qs.first()
    profile = them.profile
    data = {}
    try:
        data = request.data
    except:
        pass
    action = data.get("action")

    if action == "follow":
        print ("Asd")
        profile.followers.add(me)
    elif action == "unfollow" :
        profile.followers.remove(me)
    else :
        pass 
    
    print (them.profile.user.username)
    print (request.user.username)
    return Response ({"count":profile.followers.count()}, status = 200)
 