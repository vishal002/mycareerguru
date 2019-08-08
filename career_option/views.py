__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import CareerOption
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class CareerOptionListView(APIView):

    def get(self, request):
        """
        To retrieve all career_options list
        :return: list of career_options with details
        """
        LOGGER.info("Retrieving career_option data")
        request_type = request.GET.get("request_type")
        result = []
        if request_type == "SEARCH":
            field = request.GET.get("field")
            value = request.GET.get("value")
            if field == "name":
                result = CareerOption.objects.filter(name__icontains=value)
            elif field == "want_to_be":
                result = CareerOption.objects.filter(how_to_become__icontains=value)
            elif field == "subject":
                result = CareerOption.objects.filter(subject__icontains=value)
            elif field == "majorfield":
                result = CareerOption.objects.filter(majorfield__name__icontains=value)
        else:
            result = CareerOption.objects.all()
        career_option_list = []

        if request_type == "FILTER_OPTIONS":
            career_filters_data = {"SUBJECT": [], "WANT_TO_BE": [], "MAJORFIELD": []}
            for career_option in result:
                career_filters_data["SUBJECT"].append(career_option.subject)
                career_filters_data["WANT_TO_BE"].append(career_option.how_to_become)
                career_filters_data["MAJORFIELD"].append(career_option.majorfield.name)
            career_filters_data["SUBJECT"] = list(set(career_filters_data["SUBJECT"]))
            career_filters_data["WANT_TO_BE"] = list(set(career_filters_data["WANT_TO_BE"]))
            career_filters_data["MAJORFIELD"] = list(set(career_filters_data["MAJORFIELD"]))
            return Response({"status": "SUCCESS", "data": career_filters_data})
        else:
            for career_option in result:
                career_option_dict = model_to_dict(career_option)
                career_option_list.append(career_option_dict)
        return Response({"status": "SUCCESS", "data": career_option_list})


class CareerOptionDetailView(APIView):

    def get(self, request):
        """
        Fetch particular career_option details
        :param request: Id of the career_option
        :return: career_option details in dict format
        """
        career_option_id = request.GET.get('career_option_id')
        LOGGER.info("CareerOption id:%s", career_option_id)
        career_option = CareerOption.objects.get(id=career_option_id)
        career_option_dict = model_to_dict(career_option)
        return Response({"status": "SUCCESS", "data": career_option_dict})

    def post(self, request):
        """
        Create career_option record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            career_option = CareerOption(**data)
            career_option.save()
            LOGGER.info("CareerOption created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing career_option record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        career_option_id = data['career_option_id']
        data.pop("career_option_id")
        LOGGER.info("career_option id:%d", career_option_id)
        career_option_data = CareerOption.objects.filter(id=career_option_id)

        try:
            career_option_data.update(**data)
            LOGGER.info("CareerOption data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested career_option record from database
        :param request: Id of the career_option
        :return: status & respective message
        """

        data = request.data
        career_option_id = data["career_option_id"]
        LOGGER.info("career_option id:%d", career_option_id)
        try:
            CareerOption.objects.get(id=career_option_id).delete()
            LOGGER.info("CareerOption deleted successfully")
            return Response({"status": "SUCCESS", "message": "CareerOption deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete career option"})
