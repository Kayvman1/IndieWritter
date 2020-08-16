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



@api_view(['GET','OPTIONS'])
def search_view(request, search_term, *args, **kwargs):

    return Response({"search":search_term}, status = 200)