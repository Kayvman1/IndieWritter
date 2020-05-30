from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Poem

# Create your views here.


def poem_list_view(request, *args, **kwargs):
    qs = Poem.objects.all()
    poem_list = [{"id": obj.id, "content": obj.content} for obj in qs]
    data = {
        'response' : poem_list
    }
    return JsonResponse(data)

def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html", context = {}, status = 200)

def poem_detail_view(request, poem_id, *args, **kwargs):
    '''
    Rest api view, return json data
    consume with java scipt
    '''
    data = {
        'id': poem_id,
    }

    status = 200

    try:
        obj = Poem.objects.get(id = poem_id)
        data['content'] = obj.content
        #"img_path": obj.image.url
    except:
        
        data ['message'] = "Poem Not Found"
        status = 404



    return JsonResponse(data, status = status)

   # return HttpResponse(f"<h1> hello freak bitches {poem_id} - {obj.content}</h1>" )