__author__ = 'rishikesht'
from django.db import models

class StudyAbroad(models.Model):
    """
    Used to store data about abroad study
    """
    country_name = models.CharField(max_length=255, unique=True)
    currency = models.CharField(max_length=60)
    highest_temp = models.CharField(max_length=60)
    lowest_temp = models.CharField(max_length=60)
    about = models.TextField()
    exam = models.TextField()
    top_universities = models.CharField(max_length=100)
    visa_info = models.TextField(max_length=100)
    travel = models.CharField(max_length=30)
    scholarship = models.TextField()
    cost_of_livings = models.TextField()
    life_in_country = models.TextField()
    admission_consultants = models.TextField()
    level = models.CharField(max_length=30)


    def __str__(self):
        return self.name

    class Meta:
        ordering = ('country_name',)