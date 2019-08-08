from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^college/', include('colleges.urls')),
    url(r'^majorfields/', include('majorfields.urls')),
    url(r'^frontend/', include('frontend.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^course/', include('courses.urls')),
    url(r'^exam/', include('exam.urls')),
    url(r'^user/', include('user.urls')),
    url(r'^school/', include('school.urls')),
    url(r'^studyabroad/', include('study_abroad.urls')),
    url(r'^scholarship/', include('scholarship.urls')),
    url(r'^careeroption/', include('career_option.urls')),
    url(r'^test/', include('test.urls')),
    url(r'^testimonial/', include('testimonial.urls')),
    url(r'^mentoring/', include('mentoring.urls')),
    url(r'^aboutus/', include('about_us.urls')),
    url(r'^donation/', include('donation.urls'))
)
