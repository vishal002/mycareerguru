__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import AboutUs
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class AboutUsListView(APIView):

    def get(self, request):
        """
        To retrieve all about_uss list
        :return: list of about_uss with details
        """
        LOGGER.info("Retrieving about us data")

        result = AboutUs.objects.all()
        about_us_list = []

        for about_us in result:
            about_us_dict = model_to_dict(about_us)
            about_us_list.append(about_us_dict)
        return Response({"status": "SUCCESS", "data": about_us_list})


class AboutUsDetailView(APIView):

    def get(self, request):
        """
        Fetch particular about_us details
        :param request: Id of the about_us
        :return: about_us details in dict format
        """
        about_us_id = request.GET.get('id')
        LOGGER.info("AboutUs id:%s", about_us_id)
        about_us = AboutUs.objects.get(id=about_us_id)
        about_us_dict = model_to_dict(about_us)
        return Response({"status": "SUCCESS", "data": about_us_dict})

    def post(self, request):
        """
        Create about_us record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            about_us = AboutUs(**data)
            about_us.save()
            LOGGER.info("AboutUs created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing about_us record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        about_us_id = data['id']
        data.pop("id")
        LOGGER.info("about_us id:%d", about_us_id)
        about_us_data = AboutUs.objects.filter(id=about_us_id)

        try:
            about_us_data.update(**data)
            LOGGER.info("AboutUs data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested about_us record from database
        :param request: Id of the about_us
        :return: status & respective message
        """

        data = request.data
        about_us_id = data["id"]
        LOGGER.info("about_us id:%d", about_us_id)
        try:
            AboutUs.objects.get(id=about_us_id).delete()
            LOGGER.info("AboutUs deleted successfully")
            return Response({"status": "SUCCESS", "message": "AboutUs deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete career option"})
