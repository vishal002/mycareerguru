from django.contrib import admin
from models import *

class CollegeAdmin(admin.ModelAdmin):
    list_display = ('name','city')

admin.site.register(College,CollegeAdmin)