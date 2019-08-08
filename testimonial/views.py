__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import Testimonial
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class TestimonialListView(APIView):

    def get(self, request):
        """
        To retrieve all testimonials list
        :return: list of testimonials with details
        """
        LOGGER.info("Retrieving testimonial data")
        request_type = request.GET.get("request_type")

        if request_type == "SEARCH":
            name = request.GET.get("name")
            result = Testimonial.objects.filter(name__icontains=name)
        else:
            result = Testimonial.objects.all()
        testimonial_list = []

        for testimonial in result:
            testimonial_dict = model_to_dict(testimonial)
            testimonial_list.append(testimonial_dict)
        return Response({"status": "SUCCESS", "data": testimonial_list})


class TestimonialDetailsView(APIView):

    def get(self, request):
        """
        Fetch particular testimonial details
        :param request: Id of the testimonial
        :return: testimonial details in dict format
        """
        testimonial_id = request.GET.get('testimonial_id')
        LOGGER.info("Testimonial id:%s", testimonial_id)
        testimonial = Testimonial.objects.get(id=testimonial_id)
        testimonial_dict = model_to_dict(testimonial)
        return Response({"status": "SUCCESS", "data": testimonial_dict})

    def post(self, request):
        """
        Create testimonial record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            testimonial = Testimonial(**data)
            testimonial.save()
            LOGGER.info("Testimonial created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing testimonial record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        testimonial_id = data['testimonial_id']
        data.pop("testimonial_id")
        LOGGER.info("testimonial id:%d", testimonial_id)
        testimonial_data = Testimonial.objects.filter(id=testimonial_id)

        try:
            testimonial_data.update(**data)
            LOGGER.info("Testimonial data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested testimonial record from database
        :param request: Id of the testimonial
        :return: status & respective message
        """

        data = request.data
        testimonial_id = data["testimonial_id"]
        LOGGER.info("testimonial id:%d", testimonial_id)
        try:
            Testimonial.objects.get(id=testimonial_id).delete()
            LOGGER.info("Testimonial deleted successfully")
            return Response({"status": "SUCCESS", "message": "Testimonial deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete career option"})
