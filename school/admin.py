from django.contrib import admin
from models import *

class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(School, SchoolAdmin)