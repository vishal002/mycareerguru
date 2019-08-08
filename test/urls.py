__author__ = 'rishikesh'

from django.conf.urls import include, url
from .views import UserTestDetailsView, UserTestListView, TestTypeView, TestSubTypeView, QuestionView

urlpatterns = [

    url(r'^testlist', UserTestListView.as_view(), name='testlist'),
    url(r'^testdetails', UserTestDetailsView.as_view(), name='test'),
    url(r'^addTest$', UserTestDetailsView.as_view(), name='add_test'),
    url(r'^editTest$', UserTestDetailsView.as_view(), name='edit_test'),
    url(r'^deleteTest$', UserTestDetailsView.as_view(), name='delete_test'),

    url(r'^testtypedetails', TestTypeView.as_view(), name='testtype'),
    url(r'^addTestType$', TestTypeView.as_view(), name='add_testtype'),
    url(r'^editTestType$', TestTypeView.as_view(), name='edit_testtype'),
    url(r'^deleteTestType$', TestTypeView.as_view(), name='delete_testtype'),

    url(r'^testsubtypedetails', TestSubTypeView.as_view(), name='testsubtype'),
    url(r'^addTestSubType$', TestSubTypeView.as_view(), name='add_testsubtype'),
    url(r'^editTestSubType$', TestSubTypeView.as_view(), name='edit_testsubtype'),
    url(r'^deleteTestSubType$', TestSubTypeView.as_view(), name='delete_testsubtype'),

    url(r'^questiondetails', QuestionView.as_view(), name='question'),
    url(r'^addQuestion$', QuestionView.as_view(), name='add_question'),
    url(r'^editQuestion$', QuestionView.as_view(), name='edit_question'),
    url(r'^deleteQuestion$', QuestionView.as_view(), name='delete_question')
]
