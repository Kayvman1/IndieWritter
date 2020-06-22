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
    return render(request, "pages/home.html", context = {}, status = 200)

@api_view (['POST']) #client must send post
#@authentication_classes([SessionAuthentication]) 
@permission_classes ([IsAuthenticated])
def poem_create_view(request, *args, **kwargs):
    dict_str = request.body.decode("UTF-8")
    mydata = ast.literal_eval(dict_str)
    #you can just use request.data
    serializer = PoemCreateSerializer( data = mydata)
    print("---------------------------------------------------------------------")
    print(mydata, "create",  type(mydata))
    print("---------------------------------------------------------------------")
    if serializer.is_valid(raise_exception = True):
        serializer.save(user= request.user)     
        return Response (serializer.data, status = 201)
    
    return Response({}, status = 400)

@api_view  (['GET', 'OPTION'])
def poem_list_view(request, *args, **kwargs):
    print('-------------------------------------------')
    print("list")
    print('-------------------------------------------')
    username = request.GET.get('username')
    qs = Poem.objects.all()
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    serializer = PoemSerializer(qs, many = True)
    return Response(serializer.data, status = 200)


@api_view(['GET','OPTIONS'])
def poem_detail_view(request, poem_id, *args, **kwargs):
    
    print('-------------------------------------------')
    print("detail")
    print('-------------------------------------------')
    qs = Poem.objects.filter(id = poem_id)
    if not qs.exists():
        return Response({"message": "Poem not found"}, status = 404)

    obj = qs.first()
    serializer = PoemSerializer(obj)
        #"img_path": obj.image.url
    return Response(serializer.data, status = 200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def poem_delete_view(request, poem_id, *args, **kwargs):
    print('-------------------------------------------')
    print("delete")
    print('-------------------------------------------')
    qs = Poem.objects.filter(id = poem_id)
    if not qs.exists():
        return Response({'message': 'You can not delete this'}, 401)
    qs = qs.filter(user= request.user)
    obj = qs.first()
    obj.delete
    return Response({"message":"deletion  success"}, status = 200  )

@api_view([ 'POST'])
@permission_classes([IsAuthenticated])
def poem_action_view(request, *args, **kwargs):
    '''
    id is required
    possible actions are : like, unlike, republish
    '''
    print('-------------------------------------------')
    print("action")
    print('-------------------------------------------')
    serializer = (PoemActionSerializer(data = request.data))
    if serializer.is_valid(raise_exception = True):
        data = serializer.validated_data
        poem_id = data.get("id")
        content = data.get("content")
        action = data.get("action")
     
    qs = Poem.objects.filter(id = poem_id)
    
    if not qs.exists():
        return Response({'message': 'You can not like this'}, 404)
    obj = qs.first()

    if action == "like":
        obj.likes.add(request.user)
        serializer = PoemSerializer(obj)
    elif action == "unlike":
        obj.likes.remove(request.user)
        serializer = PoemSerializer(obj)
    elif action == "repub":
        new_Poem = Poem.objects.create(
            user=request.user, 
            parent=obj,
            content=content,
            )
        serializer = PoemSerializer(new_Poem)

 
 
    return Response(serializer.data, status = 200  )












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
def dispatch(self, request, *args, **kwargs):
    print("ad")
    if request.method.lower() in self.http_method_names:
        handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
    else:
        handler = self.http_method_not_allowed
    return handler(request, *args, **kwargs)