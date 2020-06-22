
from django.urls import path, re_path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from .views import (
    home_view, 
    poem_detail_view, 
    poem_list_view, 
    poem_create_view, 
    poem_delete_view, 
    poem_action_view
)

urlpatterns = [

    path('', poem_list_view),
    path ('create/', poem_create_view),
    path('action/', poem_action_view),
    path('<int:poem_id>/', poem_detail_view),
    #path('<int:poem_id>/', poem_detail_view),
    path('<int:poem_id>/delete/', poem_delete_view)  
]

#if settings.DEBUG:
    #urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)