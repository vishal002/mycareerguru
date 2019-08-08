from django.contrib import admin
from models import *

class TestTypeAdmin(admin.ModelAdmin):
    list_display = ('test_type',)

class TestSubTypeAdmin(admin.ModelAdmin):
    list_display = ('sub_test_type',)

class QuestionsAdmin(admin.ModelAdmin):
    list_display = ('test_question',)

class UserTestHistoryAdmin(admin.ModelAdmin):
    list_display = ('test_taken_on',)

admin.site.register(TestType, TestTypeAdmin)
admin.site.register(TestSubType, TestSubTypeAdmin)
admin.site.register(Questions, QuestionsAdmin)
admin.site.register(UserTestHistory, UserTestHistoryAdmin)