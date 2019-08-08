__author__ = 'adityaa'

from django.conf.urls import include, url
from .views import SchoolListView, SchoolDetailView

urlpatterns = [

    url(r'^schoollist$', SchoolListView.as_view(), name='school'),
    url(r'^schooldetails$', SchoolDetailView.as_view(), name='school_detail'),
    url(r'^addSchool$', SchoolDetailView.as_view(), name='add_school'),
    url(r'^editSchool$', SchoolDetailView.as_view(), name='edit_school'),
    url(r'^deleteSchool$', SchoolDetailView.as_view(), name='delete_school')
]
