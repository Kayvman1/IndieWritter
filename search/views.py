import random
import ast

from django.db.models import Q
 
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from profiles.models import Profile
from profiles.serializers import PublicProfileSerializer
from poems.models import Poem
from poems.serializers import PoemSerializer


ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view([ 'POST'])
def search(request, *args, **kwargs):
    
    type = request.data.get("type")
    terms = request.data.get("search")
    if terms == None :
        return Response ({}, status = 400)
    queries =  terms.split(" ")

    if type =="user":
        resp = Profile.objects.none()
        for q in queries:
            persons = Profile.objects.filter(
                Q(user__username__icontains = q)|
                Q(user__first_name__icontains = q)|
                Q(user__last_name__icontains = q)
            ).distinct()
            resp = resp | persons
            return paginated_user_response(resp, request)
    
    elif type == "poem":
        resp = Poem.objects.none()
        for q in queries:
            poems = Poem.objects.filter(
                Q(title__icontains = q)
            ).distinct()
            resp = resp | poems
        return paginated_poem_response(resp, request)
    else:
        return Response({}, status = 400)
   

    


def paginated_poem_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = PoemSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data) # Response( serializer.data, status=200)

def paginated_user_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = PublicProfileSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data) # Response( serializer.data, status=200)