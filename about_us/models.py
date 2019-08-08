__author__ = 'rishikesht'
from django.db import models

class AboutUs(models.Model):
    """
    Used to store data for about us
    """
    about_us = models.TextField()
    contact_us = models.TextField()
