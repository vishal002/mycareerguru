__author__ = 'rishikesht'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from models import StudyAbroad
from django.forms.models import model_to_dict

LOGGER = logging.getLogger("mycareerguru")

class StudyAbroadListView(APIView):

    def get(self, request):
        """
        To retrieve all study_abroads list
        :return: list of study_abroads with details
        """
        LOGGER.info("Retrieving study_abroad data")
        request_type = request.GET.get("request_type")

        result = []
        if request_type == "SEARCH":
            try:
                level = request.GET.get("level")
                result = StudyAbroad.objects.filter(level=level)
            except:
                name = request.GET.get("country_name")
                result = StudyAbroad.objects.filter(country_name__icontains=name)
        else:
            result = StudyAbroad.objects.all()
        study_abroad_list = []
        for study_abroad in result:
            study_abroad_dict = model_to_dict(study_abroad)
            study_abroad_list.append(study_abroad_dict)
        return Response({"status": "SUCCESS", "data": study_abroad_list})


class StudyAbroadDetailView(APIView):

    def get(self, request):
        """
        Fetch particular study_abroad details
        :param request: Id of the study_abroad
        :return: study_abroad details in dict format
        """
        study_abroad_id = request.GET.get('study_abroad_id')
        LOGGER.info("StudyAbroad id:%s", study_abroad_id)
        study_abroad = StudyAbroad.objects.get(id=study_abroad_id)
        study_abroad_dict = model_to_dict(study_abroad)
        return Response({"status": "SUCCESS", "data": study_abroad_dict})

    def post(self, request):
        """
        Create study_abroad record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            study_abroad = StudyAbroad(**data)
            study_abroad.save()
            LOGGER.info("StudyAbroad created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing study_abroad record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        study_abroad_id = data['study_abroad_id']
        data.pop("study_abroad_id")
        LOGGER.info("study_abroad id:%d", study_abroad_id)
        study_abroad_data = StudyAbroad.objects.filter(id=study_abroad_id)

        try:
            study_abroad_data.update(**data)
            LOGGER.info("StudyAbroad data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested study_abroad record from database
        :param request: Id of the study_abroad
        :return: status & respective message
        """

        data = request.data
        study_abroad_id = data["study_abroad_id"]
        LOGGER.info("study_abroad id:%d", study_abroad_id)
        try:
            StudyAbroad.objects.get(id=study_abroad_id).delete()
            LOGGER.info("StudyAbroad deleted successfully")
            return Response({"status": "SUCCESS", "message": "StudyAbroad deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete study abroad"})
