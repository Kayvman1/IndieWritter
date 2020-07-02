from django.db import models
import random
from django.conf import settings
from django.db import models
from django.db.models import Q


User = settings.AUTH_USER_MODEL

# Create your models here.



class PoemLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Poem", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class PoemQuerySet(models.QuerySet ):
    def by_username(self, username):
        return self.filter(user__username__iexact = username)

    def feed (self, user):
        profiles_exist = user.following.exists()
        followed_users_ids = []
        if profiles_exist:
            followed_users_ids = user.following.values_list("user__id", flat = True)
        return self.filter(
            Q(user__id__in= followed_users_ids) |
            Q(user= user)
        ).distinct().order_by("-timestamp")

class PoemManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return PoemQuerySet(self.model, using = self._db)
    def feed (self, user):
        return self.get_queryset().feed(user)

class Poem(models.Model):
    user = models.ForeignKey(User,  on_delete = models.CASCADE, related_name='poems')
 #on delete = casade deletes everything
 #you can just backup the server to keep these tweets
 #set null keeps the work but assings the user asa null
 #must add null = True
    parent = models.ForeignKey("self", null = True, on_delete = models.SET_NULL)
    title = models.CharField(max_length = settings.MAX_TITLE_LEN, null = False, blank  = False)
    content = models.TextField(blank = True, null=True) 
    image = models.FileField(upload_to = 'images/', blank =True, null =True  )
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='poem_user', blank=True, through=PoemLike)

    objects = PoemManager()
    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'content' : self.content,
            'likes' : random.randint(0 , 200)
        }
    
    def __str__(self):
        return self.title
    
    @property
    def is_repub(self):
        return self.parent != None