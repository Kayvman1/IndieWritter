from django.contrib import admin
from .models import Poem, PoemLike
# Register your models here.


class PoemLikeAdmin(admin.TabularInline):
    model = PoemLike

class PoemAdmin(admin.ModelAdmin):
    inlines = [PoemLikeAdmin]
    list_display = ['id','__str__', 'user']
    search_fields = ['content','user__username', 'user__email']

    class Meta:
        model = Poem

admin.site.register(Poem, PoemAdmin)