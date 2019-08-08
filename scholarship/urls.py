__author__ = 'rishikesht'

from django.conf.urls import include, url
from .views import ScholarshipListView, ScholarshipDetailView

urlpatterns = [

    url(r'^scholarshiplist$', ScholarshipListView.as_view(), name='scholarship'),
    url(r'^scholarshipdetails$', ScholarshipDetailView.as_view(), name='scholarship_detail'),
    url(r'^addScholarship$', ScholarshipDetailView.as_view(), name='add_scholarship'),
    url(r'^editScholarship$', ScholarshipDetailView.as_view(), name='edit_scholarship'),
    url(r'^deleteScholarship$', ScholarshipDetailView.as_view(), name='delete_scholarship')
]
