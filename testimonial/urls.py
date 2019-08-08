__author__ = 'rishikesh'

from django.conf.urls import include, url
from .views import TestimonialDetailsView, TestimonialListView

urlpatterns = [

    url(r'^testimoniallist', TestimonialListView.as_view(), name='testimoniallist'),
    url(r'^testimonialdetails', TestimonialDetailsView.as_view(), name='testimonial'),
    url(r'^addTestimonial$', TestimonialDetailsView.as_view(), name='add_testimonial'),
    url(r'^editTestimonial$', TestimonialDetailsView.as_view(), name='edit_testimonial'),
    url(r'^deleteTestimonial$', TestimonialDetailsView.as_view(), name='delete_testimonial')
]
