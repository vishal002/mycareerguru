from django.contrib import admin
from models import *

class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(Testimonial, TestimonialAdmin)