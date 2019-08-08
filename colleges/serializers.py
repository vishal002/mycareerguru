__author__ = 'rishikesh'
from rest_framework import serializers
from courses.models import Course

#TODO need to look into serializer
class CollegeSerializer(serializers.ModelSerializer):
	name            = serializers.CharField(max_length=255)
	city            = serializers.CharField(max_length=60)
	state           = serializers.CharField(max_length=60)
	country         = serializers.CharField(max_length=60)
	establishment   = serializers.CharField(max_length=60)
	accreditted_by  = serializers.CharField(max_length=100)
	institute_type  = serializers.CharField(max_length=100)
	affiliated_to   = serializers.CharField(max_length=100)
	rank_index      = serializers.CharField(max_length=30)
    # TODO for all CharField columns
	about           = serializers.CharField()
	visiting_companies = serializers.CharField()
	placements      = serializers.CharField()
	facilities      = serializers.CharField()
	faculty         = serializers.CharField()
	scholarship_and_finance = serializers.CharField()
	pin_code        = serializers.CharField(max_length=20)
	email           = serializers.EmailField(max_length=100)
	website         = serializers.CharField(max_length=200)
	phone           = serializers.CharField(max_length=150)
	fax             = serializers.CharField(max_length=150)
	full_address    = serializers.CharField(max_length=555)
	avg_salary      = serializers.CharField(max_length=150)
	fees            = serializers.CharField()
	rating          = serializers.CharField(max_length=60)
	other_details   = serializers.CharField()
	naac_rating     = serializers.CharField(max_length=30)
	offered_courses = serializers.RelatedField(many=True, read_only=True)

	#class Meta:

		#model = Course
		#fields = ('name', 'id', 'description')