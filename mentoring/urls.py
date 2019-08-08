__author__ = 'rishikesh'

from django.conf.urls import include, url
from .views import MentoringDetailsView, MentoringListView

urlpatterns = [

    url(r'^mentoringlist', MentoringListView.as_view(), name='mentoringlist'),
    url(r'^mentoringdetails', MentoringDetailsView.as_view(), name='mentoring'),
    url(r'^addMentoring$', MentoringDetailsView.as_view(), name='add_mentoring'),
    url(r'^editMentoring$', MentoringDetailsView.as_view(), name='edit_mentoring'),
    url(r'^deleteMentoring$', MentoringDetailsView.as_view(), name='delete_mentoring')
]
