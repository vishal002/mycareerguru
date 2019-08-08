__author__ = 'rishikesht'
from django.db import models

class Scholarship(models.Model):
    """
    Used to store data about abroad study
    """
    foundation_name = models.CharField(max_length=255, unique=True)
    viewed_count = models.IntegerField()
    deadline_date = models.DateTimeField()
    lowest_temp = models.CharField(max_length=60)
    amount = models.IntegerField()
    eligibility = models.TextField()
    deadline_details = models.TextField()
    amount_details = models.TextField()
    procedure = models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    pincode = models.CharField(max_length=60)
    address = models.TextField()
    mobile = models.CharField(max_length=200)
    fax = models.CharField(max_length=255)
    phone = models.CharField(max_length=200)
    scholarship_type = models.CharField(max_length=64)
    email = models.EmailField()


    def __str__(self):
        return self.foundation_name

    class Meta:
        ordering = ('foundation_name',)