__author__ = 'jayeshd'


from django.conf.urls import include, url


urlpatterns = [
    url(r'^home$', 'frontend.views.home', name='home'),

]
