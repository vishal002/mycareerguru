__author__ = 'adityaa'
from django.db import models
from colleges.models import College
from majorfields.models import MajorFields

DATE_INPUT_FORMATS = '%d-%m-%Y'

class Exam(models.Model):
    """
    Used to college data
    """
    name         = models.CharField(max_length=255, unique=True)
    about        = models.TextField()
    eligibility  = models.TextField()
    age_limit    = models.TextField()
    marital_status   = models.CharField(max_length=100)
    physical_standard= models.TextField()
    syllabus     = models.TextField() 
    exam_pattern = models.TextField()
    validity     = models.TextField()
    application_procedure    = models.TextField()
    application_form = models.TextField()
    application_fee  = models.TextField()
    exam_date        = models.TextField()
    exam_centres     = models.TextField()
    full_address    = models.TextField()
    phone           = models.CharField(max_length=200)
    website         = models.CharField(max_length=200)
    fax             = models.CharField(max_length=200)
    email           = models.TextField()
    other_details   = models.TextField()
    level           = models.CharField(max_length=200)
    preparation_tips= models.TextField()
    exam_results    = models.TextField()
    title           = models.CharField(max_length=100, default='')
    latest_development = models.TextField(default='')
    previous_years_question_papers = models.TextField(default='')
    notification    = models.TextField(default='')
    important_dates = models.TextField(default='')
    study_material  = models.TextField(default='')
    admit_card      = models.TextField(default='')
    exam_toppers    = models.TextField(default='')
    subject_experts = models.TextField(default='')
    exam_cut_offs   = models.TextField(default='')
    preparation_videos = models.TextField(default='')
    documents_to_be_carried = models.TextField(default='')
    acknowledgement_of_form = models.TextField(default='')
    score_evalutaion   = models.TextField(default='')
    faqs               = models.TextField(default='')
    field              = models.ForeignKey(MajorFields)
    colleges           = models.ManyToManyField(College, blank=True)
    # top colleges

    def __str__(self):
        return self.name

    '''class Meta:
        ordering = ('name',)'''

'''class ExamCollegeMap(models.Model):
    """
    Used to map college to course
    """
    exam      = models.ForeignKey(Exam)
    college   = models.ForeignKey(College)
    
    def __str__(self):
        return self.exam + " " + self.college'''

# referred this to design
"""
    Title 
    About 
    Eligiblity    
    Age Limit 
    Marital status    
    Physical Standard 
    Syllabus  
    Pattern   
    Validity  
    Procedure 
    Application Form  
    Exam Fee  
    Exam Date 
    Exam Centres  
    Address Line 1    
    Address Line 2    
    Address Line 3    
    Address Line 4    
    Address Line 5    
    Address Line 6    
    Phone 
    Website   
    Fax   
    Email
"""