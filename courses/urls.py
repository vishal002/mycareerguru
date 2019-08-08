__author__ = 'adityaa'

from django.conf.urls import include, url
from .views import CourseListView, CourseDetailView

urlpatterns = [

    url(r'^courselist$', CourseListView.as_view(), name='course'),
    url(r'^coursedetails$', CourseDetailView.as_view(), name='course_detail'),
    url(r'^addCourse$', CourseDetailView.as_view(), name='add_course_detail'),
    url(r'^editCourse$', CourseDetailView.as_view(), name='edit_course'),
    url(r'^deleteCourse$', CourseDetailView.as_view(), name='delete_course')
]
    