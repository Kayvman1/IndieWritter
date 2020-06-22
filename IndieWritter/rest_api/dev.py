from rest_framework import authentication
from django.contrib.auth import get_user_model

User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        #random user for each action
        #qs = User.objects.all()
        #same user for each action
        qs = User.objects.filter(id=1)
        user = qs.order_by("?").first()
        return (user, None)