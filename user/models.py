__author__ = 'rishikesht'
from django.db import models
from django.contrib.auth.models import User


class City(models.Model):
    """
    City List
    """
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class Education(models.Model):
    """
    Current education list
    """
    education = models.CharField(max_length=60)

    def __str__(self):
        return self.education

    class Meta:
        ordering = ('education',)


class Guidance(models.Model):
    """
    Fields in which guidence is required
    """
    guidance_for = models.CharField(max_length=60)

    def __str__(self):
        return self.guidance_for

    class Meta:
        ordering = ('guidance_for',)


class HeardAboutMCG(models.Model):
    """
    Heard about MCG from
    """
    heard_from = models.CharField(max_length=100)

    def __str__(self):
        return self.heard_from

    class Meta:
        ordering = ('heard_from',)

class UserProfile(models.Model):
    """
    User management table
    """

    # name                   = models.CharField(max_length=255)
    # email                  = models.EmailField(max_length=100)
    # Either STUDENT/PARENT
    user_id                = models.ForeignKey(User)
    user_type              = models.CharField(max_length=8)
    birth_date             = models.DateTimeField()
    phone                  = models.CharField(max_length=150)
    majorfield_of_interest = models.CharField(max_length=60)
    pin_code               = models.CharField(max_length=20)
    password               = models.CharField(max_length=100)
    city                   = models.ForeignKey(City)
    current_education      = models.ForeignKey(Education)
    guidence_for           = models.ForeignKey(Guidance)
    heard_about_mcg_from   = models.ForeignKey(HeardAboutMCG)

    def __str__(self):
        return self.birth_date

    class Meta:
        ordering = ('birth_date',)
