__author__ = 'jayeshd'
from django.db import models
from courses.models import Course

DATE_INPUT_FORMATS = '%d-%m-%Y'

class College(models.Model):
    """
    Used to college data
    """
    name            = models.CharField(max_length=255, unique=True)
    city            = models.CharField(max_length=60)
    state           = models.CharField(max_length=60)
    country         = models.CharField(max_length=60)
    establishment   = models.CharField(max_length=60)
    accreditted_by  = models.CharField(max_length=100)
    institute_type  = models.CharField(max_length=100)
    affiliated_to   = models.CharField(max_length=100)
    rank_index      = models.CharField(max_length=30)
    about           = models.TextField()
    visiting_companies = models.TextField()
    placements      = models.TextField()
    facilities      = models.TextField()
    faculty         = models.TextField()
    scholarship_and_finance = models.TextField()
    pin_code        = models.CharField(max_length=20)
    email           = models.EmailField(max_length=100)
    website         = models.CharField(max_length=200)
    phone           = models.CharField(max_length=150)
    fax             = models.CharField(max_length=150)
    full_address    = models.CharField(max_length=555)
    avg_salary      = models.CharField(max_length=150)
    fees            = models.TextField()
    rating          = models.CharField(max_length=60)
    other_details   = models.TextField()
    naac_rating     = models.CharField(max_length=30)
    courses         = models.ManyToManyField(Course, blank=True)

    #def __str__(self):
    #    return self.name

    class Meta:
        ordering = ('name',)

'''class CollegeCourseMap(models.Model):
    """
    Used to map college to course
    """
    college   = models.ForeignKey(College)
    course    = models.ForeignKey(Course)

    def __str__(self):
        return self.college + " " + self.course'''

# referred this to design
"""
    Name of the Institution 
    City
    State
    Established in  
    Accredited By
    Type    
    Affiliated To   
    Facilities  
    Rank Index  
    About   
    Visiting Companies  
    # of Courses- XX
    Courses 
    Placements  
    Available College Facilities - XX Repeat    
    Faculty 
    Scholarship and Finance 
    PIN 
    Email   
    Website 
    Phone   
    Address 
    Average Salary
    
    Fees
    NAAC Rating
"""