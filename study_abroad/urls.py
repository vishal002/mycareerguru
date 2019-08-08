__author__ = 'rishikesht'

from django.conf.urls import include, url
from .views import StudyAbroadListView, StudyAbroadDetailView

urlpatterns = [

    url(r'^studyabroadlist$', StudyAbroadListView.as_view(), name='studyabroad'),
    url(r'^studyabroaddetails$', StudyAbroadDetailView.as_view(), name='studyabroad_detail'),
    url(r'^addStudyAbroad$', StudyAbroadDetailView.as_view(), name='add_studyabroad'),
    url(r'^editStudyAbroad$', StudyAbroadDetailView.as_view(), name='edit_studyabroad'),
    url(r'^deleteStudyAbroad$', StudyAbroadDetailView.as_view(), name='delete_studyabroad')
]
