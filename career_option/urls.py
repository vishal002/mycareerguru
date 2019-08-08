__author__ = 'rishikesht'

from django.conf.urls import include, url
from .views import CareerOptionListView, CareerOptionDetailView
from .career_planning import CareerPlanningListView, CareerPlanningDetailView

urlpatterns = [

    url(r'^careeroptionlist$', CareerOptionListView.as_view(), name='careeroption'),
    url(r'^careeroptiondetails$', CareerOptionDetailView.as_view(), name='careeroption_detail'),
    url(r'^addCareerOption$', CareerOptionDetailView.as_view(), name='add_careeroption'),
    url(r'^editCareerOption$', CareerOptionDetailView.as_view(), name='edit_careeroption'),
    url(r'^deleteCareerOption$', CareerOptionDetailView.as_view(), name='delete_careeroption'),

    # Career planning operations
    url(r'^planninglist$', CareerPlanningListView.as_view(), name='careerplanning'),
    url(r'^planningdetails$', CareerPlanningDetailView.as_view(), name='careerplanning_detail'),
    url(r'^addCareerPlanning$', CareerPlanningDetailView.as_view(), name='add_careerplanning'),
    url(r'^editCareerPlanning$', CareerPlanningDetailView.as_view(), name='edit_careerplanning'),
    url(r'^deleteCareerPlanning$', CareerPlanningDetailView.as_view(), name='delete_careerplanning')
]
