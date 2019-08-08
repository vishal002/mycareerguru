from django.contrib import admin
from models import *

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(Course,CourseAdmin)