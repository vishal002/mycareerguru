__author__ = 'rishikesh'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import College
from rest_framework.exceptions import APIException
from django.forms.models import model_to_dict
from courses.models import Course
#from serializers import CollegeSerializer

LOGGER = logging.getLogger("mycareerguru")

class CollegeListView(APIView):

    def get(self, request):
        """
        To retrieve all colleges list
        :return: list of colleges with details
        """
        LOGGER.info("Retrieving college data")
        request_type = request.GET.get("request_type")

        if request_type == "FILTER":
            # Filter is used to return list of courses which are for particular majorfield under selected level
            majorfield_id = request.GET.get("majorfield_id")
            colleges = College.objects.filter(courses__majorfield_id=majorfield_id)

            try:
                course_id = request.GET.get("course_id")
                colleges = colleges.filter(courses__id=course_id)
            except:
                pass

            level = request.GET.get("level")
            result = colleges.filter(courses__level=level)

            '''after_10th_colleges = colleges.filter(courses__level="After 10")
            after_10th_dict = {college.id: college.name for college in after_10th_colleges}

            after_12th_colleges = colleges.filter(courses__level="After 12")
            after_12th_dict = {college.id: college.name for college in after_12th_colleges}

            after_grad_colleges = colleges.filter(courses__level="Post Graduation")
            after_grad_dict = {college.id: college.name for college in after_grad_colleges}'''
        elif request_type == "SEARCH":
            name = request.GET.get("name")
            result = College.objects.filter(name__icontains=name)
        else:
            result = College.objects.all()
        college_list = []

        for college in result:
            college_dict = model_to_dict(college)
            college_list.append(college_dict)
        return Response({"status": "SUCCESS", "data": college_list})


class CollegeDetailView(APIView):

    def get_object(self, college_id):
        """
        Fetch college object using college id
        :param college_id: Id of college
        :return: Object of College model if successful
        """
        try:
            return College.objects.get(id=college_id)
        except College.DoesNotExist:
            raise APIException

    def get(self, request):
        """
        Fetch particular college details
        :param request: Id of the college
        :return: college details in dict format
        """
        college_id = request.GET.get('college_id')
        LOGGER.info("College id:%s", college_id)
        college = self.get_object(college_id)
        college_dict = model_to_dict(college)
        return Response({"status": "SUCCESS", "data": college_dict})
        #serializer = CollegeSerializer(result)
        #return Response(serializer.data)

    def post(self, request):
        """
        Create college record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        course_ids = None
        if "course_ids" in data:
            course_ids = data["course_ids"]
            data.pop("course_ids")

        try:
            college = College(**data)
            college.save()
            LOGGER.info("College created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        '''if course_ids:
            for course_id in course_ids:
                course_obj = Course.objects.get(course_id)
                college_course_map = CollegeCourseMap()
                college_course_map.college = college
                college_course_map.course = course_obj
                college_course_map.save()'''

        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing college record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        college_id = data['college_id']
        data.pop("college_id")
        LOGGER.info("college id:%d", college_id)
        college_data = College.objects.filter(id=college_id)

        #TODO - need to check whether UI will send added & deleted courses separately or all together
        #curretly assuming UI is sending all values together i.e. existing assigned, deleted & newly assigned also
        course_ids = None
        if "course_ids" in data:
            course_ids = data["course_ids"]
            data.pop("course_ids")

        try:
            college_data.update(**data)
            if course_ids:
                college_data.courses_set.clear()
                for course in course_ids:
                    # TODO if needed fetch and add coure object here
                    college_data.courses_set.add(course)
            LOGGER.info("College data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            #TODO : need to handle exception & rollback accordingly
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested college record from database
        :param request: Id of the college
        :return: status & respective message
        """

        data = request.data
        college_id = data["college_id"]
        LOGGER.info("college id:%d", college_id)
        college = self.get_object(college_id)
        try:
            college.courses_set.clear()
            college.delete()
            LOGGER.info("college deleted successfully")
            return Response({"status": "SUCCESS", "message": "College deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete college"})
