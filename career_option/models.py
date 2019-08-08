__author__ = 'rishikesht'
from django.db import models
from majorfields.models import MajorFields

class CareerOption(models.Model):
    """
    Used to store data about carrer option
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    growth = models.TextField()
    academic_effort = models.TextField()
    income = models.TextField()
    duties_and_responsibilities = models.TextField()
    work_place = models.TextField()
    skills = models.TextField()
    knowledge_areas = models.TextField()
    how_to_become = models.TextField()
    caveat = models.TextField()
    remarks = models.TextField()
    subject = models.TextField()
    majorfield = models.ForeignKey(MajorFields, null=True)

    def __str__(self):
        return self.foundation_name

    class Meta:
        ordering = ('name',)


class CareerPlanning(models.Model):
    """
    Used to store data career planning fields
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    menu = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('menu',)
