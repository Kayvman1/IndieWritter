from django.contrib import admin
from .models import Poem
# Register your models here.



class PoemAdmin(admin.ModelAdmin):
    list_display = ['id','__str__', 'user']
    search_fields = ['content','user__username', 'user__email']

    class Meta:
        model = Poem

admin.site.register(Poem, PoemAdmin)