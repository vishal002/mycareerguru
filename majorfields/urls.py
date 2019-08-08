__author__ = 'adityaa'

from django.conf.urls import include, url
from .views import MajorFieldsListView, MajorFieldsDetailView, MajorfieldMappingView

urlpatterns = [
    url(r'^majorfieldslist$', MajorFieldsListView.as_view(), name='majorfields'),
    url(r'^majorfieldsdetails$', MajorFieldsDetailView.as_view(), name='majorfields_detail'),
    url(r'^addMajorField$', MajorFieldsDetailView.as_view(), name='add_majorfield'),
    url(r'^editMajorField$', MajorFieldsDetailView.as_view(), name='edit_majorfield'),
    url(r'^deleteMajorField$', MajorFieldsDetailView.as_view(), name='delete_majorfield'),
    url(r'^majorFieldMappings$', MajorfieldMappingView.as_view(), name='majorfield_mapping')
]
