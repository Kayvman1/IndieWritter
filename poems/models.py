from django.db import models
import random
from django.conf import settings
from django.db import models


User = settings.AUTH_USER_MODEL

# Create your models here.



class PoemLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Poem", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Poem(models.Model):
    user = models.ForeignKey(User,  on_delete = models.CASCADE)
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