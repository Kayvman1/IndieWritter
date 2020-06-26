import random
import ast

from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .forms import PoemForm
from .models import Poem
from .serializers import PoemSerializer, PoemActionSerializer, PoemCreateSerializer


ALLOWED_HOSTS = settings.ALLOWED_HOSTS


# Create your views here.
def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, "pages/home.html", context = {"username": username}, status = 200)

def local_poem_list(request, *args, **kwargs): 
    return render (request, "poems/list.html")
    
def local_poem_detail(request, poem_id, *args, **kwargs): 
    return render (request, "poems/detail.html", context = {"poemId": poem_id})

def local_poem_profile(request,username ,*args, **kwargs): 
    return render(request, "poems/profile.html", context={"profile_username": username})













def poem_create_view_pureDjango(request, *args, **kwargs):
    user = request.user
    form = PoemForm(request.POST or None)
    next_url = request.POST.get("next") or None

    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({},status =  401 )
        return redirect(settings.LOGIN_URL)

    if form.is_valid():
        obj = form.save(commit=False)
        # do other form related logic
        obj.user = user 
        obj.save()

        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 == created items

        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)

        form = PoemForm()

    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

    return render(request, 'components/form.html', context={"form": form})


def poem_list_view_PUREDJAGNO(request, *args, **kwargs):
    qs = Poem.objects.all()
    poem_list = [obj.serialize() for obj in qs]
    data = {
        'response' : poem_list
    }
    return JsonResponse(data)



def poem_detail_view_PD(request, poem_id, *args, **kwargs):
    '''
    Rest api view, return json data
    consume with java script
    '''
    data = {
        'id': poem_id,
    }

    status = 200

    try:
        obj = Poem.objects.get(id = poem_id)
        data['content'] = obj.content
        data['title'] = obj.title
        #"img_path": obj.image.url
    except:
        
        data ['message'] = "Poem Not Found"
        status = 404



    return JsonResponse(data, status = status)

   # return HttpResponse(f"<h1> hello freak bitches {poem_id} - {obj.content}</h1>" )
