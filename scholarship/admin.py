from django.contrib import admin
from models import *

class ScholarshipAdmin(admin.ModelAdmin):
    list_display = ('foundation_name',)

admin.site.register(Scholarship, ScholarshipAdmin)