__author__ = 'rishikesh'

from django.conf.urls import include, url
from .views import CityListView, EducationListView, HeardFromListView, GuidanceListView, UserDetailView, UserAuthView, \
    UserGroupView

urlpatterns = [

    url(r'^citylist', CityListView.as_view(), name='city'),
    url(r'^educationlist$', EducationListView.as_view(), name='education_list'),
    url(r'^guidancelist$', GuidanceListView.as_view(), name='education_list'),
    url(r'^heardfromlist$', HeardFromListView.as_view(), name='guidance_list'),
    url(r'^addUser$', UserDetailView.as_view(), name='add_user'),
    url(r'^editUser$', UserDetailView.as_view(), name='edit_user'),
    url(r'^deleteUser$', UserDetailView.as_view(), name='delete_user'),
    url(r'^login$', UserAuthView.as_view(), name='login_user'),
    url(r'^logout$', UserAuthView.as_view(), name='logout_user'),
    url(r'^grouplist$', UserGroupView.as_view(), name='group_list'),
    url(r'^addGroup$', UserGroupView.as_view(), name='add_group'),
    url(r'^editGroup$', UserGroupView.as_view(), name='edit_group'),
    url(r'^deleteGroup$', UserGroupView.as_view(), name='delete_group'),
]
