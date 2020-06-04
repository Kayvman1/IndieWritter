from django.db import models
import random

# Create your models here.
class Poem(models.Model):
    title = models.CharField(max_length = 120, null = False, blank  = False)
    content = models.TextField() 
    image = models.FileField(upload_to = 'images/', blank =True, null =True  )

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'content' : self.content,
            'likes' : random.randint(0 , 200)
        }