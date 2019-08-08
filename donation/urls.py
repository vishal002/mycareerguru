__author__ = 'rishikesht'

from django.conf.urls import include, url
from .views import DonationListView, DonationDetailView

urlpatterns = [
    url(r'^donationList$', DonationListView.as_view(), name='donation'),
    url(r'^donationDetails$', DonationDetailView.as_view(), name='donation_detail'),
    url(r'^addDonation$', DonationDetailView.as_view(), name='add_donation'),
    url(r'^editDonation$', DonationDetailView.as_view(), name='edit_donation'),
    url(r'^deleteDonation$', DonationDetailView.as_view(), name='delete_donation')
]
