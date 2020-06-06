from rest_framework import serializers
from django.conf import settings
from .models import Poem

class PoemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poem
        fields = ['id','title', 'content']
    
    def validate_content(self, value):
        if 'bitch' in value:
            raise forms.ValidationError("Explicit Langauge")
        return value
    
    def validate_title(self, value):
        if len(value) > settings.MAX_TITLE_LEN:
            raise forms.ValidationError("Your Title is Too Long")
        return value