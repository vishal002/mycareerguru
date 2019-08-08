from django.contrib import admin
from models import *

class ExamAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(Exam, ExamAdmin)