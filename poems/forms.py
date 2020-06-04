from django import forms
from .models import Poem

class PoemForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].widget.attrs['placeholder'] = 'SEXY TITLE'
        self.fields['content'].widget.attrs['placeholder'] = 'SEXY POEM'

    class Meta:
        model = Poem
        fields = [ 'title', 'content']
    
    def clean_title(self):
        title = self.cleaned_data.get("title")
        if 'poop' in title:
            raise forms.ValidationError("NO POOP")
        return title

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if 'poop' in content:
            raise forms.ValidationError("NO POOP")
        return content