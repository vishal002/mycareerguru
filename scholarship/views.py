__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import Scholarship
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class ScholarshipListView(APIView):

    def get(self, request):
        """
        To retrieve all scholarships list
        :return: list of scholarships with details
        """
        LOGGER.info("Retrieving scholarship data")
        request_type = request.GET.get("request_type")

        result= []
        if request_type == "SEARCH":
            try:
                name = request.GET.get("name")
                result = Scholarship.objects.filter(foundation_name__icontains=name)
            except:
                scholarship_type = request.GET.get("type")
                result = Scholarship.objects.filter(scholarship_type=scholarship_type)
        else:
            result = Scholarship.objects.all()
        scholarship_list = []

        for scholarship in result:
            scholarship_dict = model_to_dict(scholarship)
            scholarship_list.append(scholarship_dict)
        return Response({"status": "SUCCESS", "data": scholarship_list})


class ScholarshipDetailView(APIView):

    def get(self, request):
        """
        Fetch particular scholarship details
        :param request: Id of the scholarship
        :return: scholarship details in dict format
        """
        scholarship_id = request.GET.get('scholarship_id')
        LOGGER.info("Scholarship id:%s", scholarship_id)
        scholarship = Scholarship.objects.get(id=scholarship_id)
        scholarship_dict = model_to_dict(scholarship)
        return Response({"status": "SUCCESS", "data": scholarship_dict})

    def post(self, request):
        """
        Create scholarship record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            scholarship = Scholarship(**data)
            scholarship.save()
            LOGGER.info("Scholarship created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing scholarship record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        scholarship_id = data['scholarship_id']
        data.pop("scholarship_id")
        LOGGER.info("scholarship id:%d", scholarship_id)
        scholarship_data = Scholarship.objects.filter(id=scholarship_id)

        try:
            scholarship_data.update(**data)
            LOGGER.info("Scholarship data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested scholarship record from database
        :param request: Id of the scholarship
        :return: status & respective message
        """

        data = request.data
        scholarship_id = data["scholarship_id"]
        LOGGER.info("scholarship id:%d", scholarship_id)
        try:
            Scholarship.objects.get(id=scholarship_id).delete()
            LOGGER.info("Scholarship deleted successfully")
            return Response({"status": "SUCCESS", "message": "Scholarship deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete study abroad"})
