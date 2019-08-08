__author__ = 'adityaa'

from django.conf.urls import include, url
from .views import ExamListView, ExamDetailView

urlpatterns = [

    url(r'^examlist$', ExamListView.as_view(), name='exam'),
    url(r'^examdetails$', ExamDetailView.as_view(), name='exam_detail'),
    url(r'^addExam$', ExamDetailView.as_view(), name='add_exam'),
    url(r'^editExam$', ExamDetailView.as_view(), name='edit_exam'),
    url(r'^deleteExam$', ExamDetailView.as_view(), name='delete_exam')

]
