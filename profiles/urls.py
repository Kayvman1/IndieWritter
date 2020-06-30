from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path, include
from django.views.generic import TemplateView

from .views import (
    profile_detail_view,
    profile_update_view
)

urlpatterns = [

    #black list username edit
    path('edit/', profile_update_view),
    path('edit', profile_update_view),
    path('<str:username>', profile_detail_view),

  
]
