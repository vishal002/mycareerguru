__author__ = 'rishikesht'

from django.conf.urls import include, url
from .views import AboutUsListView, AboutUsDetailView

urlpatterns = [
    url(r'^aboutUsList$', AboutUsListView.as_view(), name='aboutUs'),
    url(r'^aboutUsDetails$', AboutUsDetailView.as_view(), name='aboutUs_detail'),
    url(r'^addAboutUs$', AboutUsDetailView.as_view(), name='add_aboutUs'),
    url(r'^editAboutUs$', AboutUsDetailView.as_view(), name='edit_aboutUs'),
    url(r'^deleteAboutUs$', AboutUsDetailView.as_view(), name='delete_aboutUs')
]
