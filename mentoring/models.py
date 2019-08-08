__author__ = 'rishikesht'
from django.db import models


class Mentoring(models.Model):
    """
    Used to store mentoring data
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    menu = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('menu',)
