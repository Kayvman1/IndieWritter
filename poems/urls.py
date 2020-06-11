
from django.urls import path

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
    path('<int:poem_id>/', poem_detail_view),
    path('api/poems/<int:poem_id>/delete/', poem_delete_view)  
]
