__author__ = 'adityaa'
from django.db import models
from user.models import User

DATE_INPUT_FORMATS = '%d-%m-%Y'

class TestType(models.Model):

    test_type         = models.CharField(max_length=255)
    test_description  = models.TextField()
    test_instructions = models.TextField()

    def __str__(self):
        return self.test_type

    class Meta:
        ordering = ('test_type',)


class TestSubType(models.Model):

    sub_test_type   = models.CharField(max_length=255)
    description     = models.TextField()
    total_time      = models.CharField(max_length=60) # in mins
    total_marks     = models.CharField(max_length=20) # to be sum of marks of all questions, optional field in db
    test_type       = models.ForeignKey(TestType)
    total_questions = models.CharField(max_length=20)

    def __str__(self):
        return self.sub_test_type

    class Meta:
        ordering = ('sub_test_type',)


class Questions(models.Model):

    test_question         = models.CharField(max_length=255)
    description           = models.TextField()
    test_option_a         = models.CharField(max_length=60)
    test_option_b         = models.CharField(max_length=60)
    test_option_c         = models.CharField(max_length=60)
    test_option_d         = models.CharField(max_length=60)
    test_option_e         = models.CharField(max_length=60)
    selectedCorrectOption = models.CharField(max_length=60) # one of the items in the list
    marks                 = models.CharField(max_length=60)
    image                 = models.CharField(max_length=60) # true if its image based test
    sub_test_type         = models.ForeignKey(TestSubType)

    def __str__(self):
        return self.test_question

    class Meta:
        ordering = ('test_question',)


class UserTestHistory(models.Model):
    '''
    Multiple history records can be kept for a user. 
    Most recent one to be shown/ Or allow test only once.
    '''
    user_id       = models.ForeignKey(User)
    test_sub_type = models.ForeignKey(TestSubType)
    total_marks   = models.IntegerField()
    marks_scored  = models.IntegerField()
    test_taken_on = models.DateTimeField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('test_taken_on',)