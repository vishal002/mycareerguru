from django.contrib import admin
from models import *

class StudyAbroadAdmin(admin.ModelAdmin):
    list_display = ('country_name',)

admin.site.register(StudyAbroad, StudyAbroadAdmin)