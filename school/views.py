__author__ = 'rishikesh'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import School
from rest_framework.exceptions import APIException
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class SchoolListView(APIView):

    def get(self, request):
        """
        To retrieve all schools list
        :return: list of schools with details
        """
        LOGGER.info("Retrieving school data")
        request_type = request.GET.get("request_type")

        if request_type == "SEARCH":
            name = request.GET.get("name")
            result = School.objects.filter(name__icontains=name)
        else:
            result = School.objects.all()
        school_list = []

        for school in result:
            school_dict = model_to_dict(school)
            school_list.append(school_dict)
        return Response({"status": "SUCCESS", "data": school_list})


class SchoolDetailView(APIView):

    def get(self, request):
        """
        Fetch particular school details
        :param request: Id of the school
        :return: school details in dict format
        """
        school_id = request.GET.get('school_id')
        LOGGER.info("School id:%s", school_id)
        school = School.objects.get(id=school_id)
        school_dict = model_to_dict(school)
        return Response({"status": "SUCCESS", "data": school_dict})

    def post(self, request):
        """
        Create school record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            school = School(**data)
            school.save()
            LOGGER.info("School created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing school record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        school_id = data['school_id']
        data.pop("school_id")
        LOGGER.info("school id:%d", school_id)
        school_data = School.objects.filter(id=school_id)

        try:
            school_data.update(**data)
            LOGGER.info("School data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested school record from database
        :param request: Id of the school
        :return: status & respective message
        """

        data = request.data
        school_id = data["school_id"]
        LOGGER.info("school id:%d", school_id)
        try:
            School.objects.get(id=school_id).delete()
            LOGGER.info("School deleted successfully")
            return Response({"status": "SUCCESS", "message": "School deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete school"})
