__author__ = 'adityaa'
from django.db import models

DATE_INPUT_FORMATS = '%d-%m-%Y'

class MajorFields(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
