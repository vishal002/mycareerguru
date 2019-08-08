__author__ = 'adityaa'
from django.db import models
from majorfields.models import MajorFields

DATE_INPUT_FORMATS = '%d-%m-%Y'

class Course(models.Model):
    name            = models.CharField(max_length=255, unique=True)
    description     = models.TextField()
    level           = models.CharField(max_length=60)
    course_type     = models.CharField(max_length=255)
    duration        = models.CharField(max_length=60)
    eligibility     = models.TextField()
    eligibility_2   = models.TextField()
    overview        = models.TextField()
    syllabus        = models.TextField()
    suitability     = models.TextField()
    beneficial      = models.TextField()
    employment_areas= models.TextField()
    job_types       = models.TextField()
    advance_course  = models.TextField()
    related_course  = models.TextField()
    careers         = models.TextField()
    recuiting_companies = models.TextField()
    other_details   = models.TextField()
    majorfield      = models.ForeignKey(MajorFields, null=True)

    def __str__(self):
        return self.name

# referred this to design
"""
    Title   
    Description 
    Duration    
    Level   
    Type    
    Eligibility 
    Overview    
    Eligibility 2   
    Syllabus    
    Suitability 
    Beneficial  
    Employment Areas    
    Job Types   
    Advance Courses 
    Related Courses
    --------------------------------------------
    Branches ------ check 
    Colleges Accepting applications
    Careers
    Recruiting companies
"""