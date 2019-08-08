__author__ = 'rishikesht'
from django.db import models

class Donation(models.Model):
    """
    Used to store data for donation
    """
    content_1 = models.TextField()
    content_2 = models.TextField()
    content_3 = models.TextField()
    content_4 = models.TextField()
