__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import Donation
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class DonationListView(APIView):

    def get(self, request):
        """
        To retrieve all donations list
        :return: list of donations with details
        """
        LOGGER.info("Retrieving about us data")

        result = Donation.objects.all()
        donation_list = []

        for donation in result:
            donation_dict = model_to_dict(donation)
            donation_list.append(donation_dict)
        return Response({"status": "SUCCESS", "data": donation_list})


class DonationDetailView(APIView):

    def get(self, request):
        """
        Fetch particular donation details
        :param request: Id of the donation
        :return: donation details in dict format
        """
        donation_id = request.GET.get('id')
        LOGGER.info("Donation id:%s", donation_id)
        donation = Donation.objects.get(id=donation_id)
        donation_dict = model_to_dict(donation)
        return Response({"status": "SUCCESS", "data": donation_dict})

    def post(self, request):
        """
        Create donation record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            donation = Donation(**data)
            donation.save()
            LOGGER.info("Donation created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing donation record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        donation_id = data['id']
        data.pop("id")
        LOGGER.info("donation id:%d", donation_id)
        donation_data = Donation.objects.filter(id=donation_id)

        try:
            donation_data.update(**data)
            LOGGER.info("Donation data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested donation record from database
        :param request: Id of the donation
        :return: status & respective message
        """

        data = request.data
        donation_id = data["id"]
        LOGGER.info("donation id:%d", donation_id)
        try:
            Donation.objects.get(id=donation_id).delete()
            LOGGER.info("Donation deleted successfully")
            return Response({"status": "SUCCESS", "message": "Donation deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete career option"})
