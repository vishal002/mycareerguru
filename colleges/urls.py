__author__ = 'rishikesh'

from django.conf.urls import include, url
from .views import CollegeListView, CollegeDetailView

urlpatterns = [

    url(r'^collegelist$', CollegeListView.as_view(), name='college'),
    url(r'^collegedetails$', CollegeDetailView.as_view(), name='college_detail'),
    url(r'^addCollege$', CollegeDetailView.as_view(), name='add_college'),
    url(r'^editCollege$', CollegeDetailView.as_view(), name='edit_college'),
    url(r'^deleteCollege$', CollegeDetailView.as_view(), name='delete_college')
]
