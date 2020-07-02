from django.urls import path, re_path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from .views import (
    user_follow_view
    
)
#endpoint /api/profiles
urlpatterns = [


    path('<str:username>/follow/', user_follow_view)  
]
