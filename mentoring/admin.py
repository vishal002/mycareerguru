from django.contrib import admin
from models import *

class MentoringAdmin(admin.ModelAdmin):
    list_display = ('menu',)

admin.site.register(Mentoring, MentoringAdmin)