from django.contrib import admin
from models import *

class CareerOptionAdmin(admin.ModelAdmin):
    list_display = ('name',)

class CareerPlanningAdmin(admin.ModelAdmin):
    list_display = ('menu',)

admin.site.register(CareerOption, CareerOptionAdmin)
admin.site.register(CareerPlanning, CareerPlanningAdmin)