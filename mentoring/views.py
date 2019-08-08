__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import Mentoring
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class MentoringListView(APIView):

    def get(self, request):
        """
        To retrieve all mentorings list
        :return: list of mentorings with details
        """
        LOGGER.info("Retrieving mentoring data")
        request_type = request.GET.get("request_type")

        if request_type == "SEARCH":
            name = request.GET.get("name")
            result = Mentoring.objects.filter(name__icontains=name)
        else:
            result = Mentoring.objects.all()
        mentoring_list = []

        for mentoring in result:
            mentoring_dict = model_to_dict(mentoring)
            mentoring_list.append(mentoring_dict)
        return Response({"status": "SUCCESS", "data": mentoring_list})


class MentoringDetailsView(APIView):

    def get(self, request):
        """
        Fetch particular mentoring details
        :param request: Id of the mentoring
        :return: mentoring details in dict format
        """
        mentoring_id = request.GET.get('mentoring_id')
        LOGGER.info("Mentoring id:%s", mentoring_id)
        mentoring = Mentoring.objects.get(id=mentoring_id)
        mentoring_dict = model_to_dict(mentoring)
        return Response({"status": "SUCCESS", "data": mentoring_dict})

    def post(self, request):
        """
        Create mentoring record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            mentoring = Mentoring(**data)
            mentoring.save()
            LOGGER.info("Mentoring created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing mentoring record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        mentoring_id = data['mentoring_id']
        data.pop("mentoring_id")
        LOGGER.info("mentoring id:%d", mentoring_id)
        mentoring_data = Mentoring.objects.filter(id=mentoring_id)

        try:
            mentoring_data.update(**data)
            LOGGER.info("Mentoring data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested mentoring record from database
        :param request: Id of the mentoring
        :return: status & respective message
        """

        data = request.data
        mentoring_id = data["mentoring_id"]
        LOGGER.info("mentoring id:%d", mentoring_id)
        try:
            Mentoring.objects.get(id=mentoring_id).delete()
            LOGGER.info("Mentoring deleted successfully")
            return Response({"status": "SUCCESS", "message": "Mentoring deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete Mentoring"})
