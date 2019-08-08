from django.contrib import admin
from models import *

class MajorFieldsAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(MajorFields, MajorFieldsAdmin)