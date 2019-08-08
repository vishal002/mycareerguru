__author__ = 'rishikesht'
from django.db import models

class Testimonial(models.Model):
    """
    Used to store data about testimonial
    """
    name = models.CharField(max_length=255, unique=True)
    video = models.TextField()
    image = models.TextField()
    text = models.TextField()
    show = models.BooleanField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
