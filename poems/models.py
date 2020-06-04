from django.db import models

# Create your models here.
class Poem(models.Model):
    title = models.CharField(max_length = 120, null = False, blank  = False)
    content = models.TextField() 
    image = models.FileField(upload_to = 'images/', blank =True, null =True  )