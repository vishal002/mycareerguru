from django.contrib import admin
from models import *

class CityAdmin(admin.ModelAdmin):
    list_display = ('name',)

class EducationAdmin(admin.ModelAdmin):
    list_display = ('education',)

class GuidanceAdmin(admin.ModelAdmin):
    list_display = ('guidance_for',)

class HeardAboutMCGAdmin(admin.ModelAdmin):
    list_display = ('heard_from',)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('birth_date',)


admin.site.register(City, CityAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(Guidance, GuidanceAdmin)
admin.site.register(HeardAboutMCG, HeardAboutMCGAdmin)
admin.site.register(UserProfile, UserProfileAdmin)