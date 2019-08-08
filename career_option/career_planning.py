__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import CareerPlanning
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class CareerPlanningListView(APIView):

    def get(self, request):
        """
        To retrieve all career_plannings list
        :return: list of career_plannings with details
        """
        LOGGER.info("Retrieving career planning data")
        request_type = request.GET.get("request_type")

        if request_type == "SEARCH":
            name = request.GET.get("menu")
            result = CareerPlanning.objects.filter(manu__icontains=name)
        else:
            result = CareerPlanning.objects.all()
        career_planning_list = []

        for career_planning in result:
            career_planning_dict = model_to_dict(career_planning)
            career_planning_dict.pop("content")
            career_planning_list.append(career_planning_dict)
        return Response({"status": "SUCCESS", "data": career_planning_list})


class CareerPlanningDetailView(APIView):

    def get(self, request):
        """
        Fetch particular career_planning details
        :param request: Id of the career_planning
        :return: career_planning details in dict format
        """
        career_planning_id = request.GET.get('career_planning_id')
        LOGGER.info("CareerPlanning id:%s", career_planning_id)
        career_planning = CareerPlanning.objects.get(id=career_planning_id)
        career_planning_dict = model_to_dict(career_planning)
        return Response({"status": "SUCCESS", "data": career_planning_dict})

    def post(self, request):
        """
        Create career_planning record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            career_planning = CareerPlanning(**data)
            career_planning.save()
            LOGGER.info("CareerPlanning created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing career_planning record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        career_planning_id = data['career_planning_id']
        data.pop("career_planning_id")
        LOGGER.info("career_planning id:%d", career_planning_id)
        career_planning_data = CareerPlanning.objects.filter(id=career_planning_id)

        try:
            career_planning_data.update(**data)
            LOGGER.info("CareerPlanning data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested career_planning record from database
        :param request: Id of the career_planning
        :return: status & respective message
        """

        data = request.data
        career_planning_id = data["career_planning_id"]
        LOGGER.info("career_planning id:%d", career_planning_id)
        try:
            CareerPlanning.objects.get(id=career_planning_id).delete()
            LOGGER.info("CareerPlanning deleted successfully")
            return Response({"status": "SUCCESS", "message": "CareerPlanning deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete career planning"})
