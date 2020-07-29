from django.urls import path, re_path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from .views import (
    
    profile_detail_api_view
)
#endpoint /api/profiles
urlpatterns = [

    path('<str:username>/', profile_detail_api_view ),
    path('<str:username>/follow/', profile_detail_api_view)  ,
]
