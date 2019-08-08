__author__ = 'adityaa'
from django.db import models

DATE_INPUT_FORMATS = '%d-%m-%Y'

class School(models.Model):
    """
    Used to college data
    """
    name            = models.CharField(max_length=255)
    full_address    = models.TextField()
    city            = models.CharField(max_length=60)
    state           = models.CharField(max_length=60)
    pin_code        = models.CharField(max_length=20)
    country         = models.CharField(max_length=60)
    phone           = models.CharField(max_length=200)
    mobile          = models.CharField(max_length=200)
    fax             = models.CharField(max_length=200)
    website         = models.CharField(max_length=200)
    class_info      = models.CharField(max_length=200)
    board           = models.CharField(max_length=200)
    info_3          = models.CharField(max_length=200)
    info_4          = models.CharField(max_length=200)
    info_5          = models.CharField(max_length=200)
    # top colleges

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)