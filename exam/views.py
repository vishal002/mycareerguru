__author__ = 'adityaa'
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from django.forms.models import model_to_dict
from rest_framework.exceptions import APIException
from models import Exam
from colleges.models import College

LOGGER = logging.getLogger("mycareerguru")


class ExamListView(APIView):
    LOGGER = logging.getLogger("mycareerguru")

    def get(self, request):
        """
        To retrieve all exams list
        :return: list of exams with details
        """
        LOGGER.info("Retrieving exam data")

        request_type = request.GET.get("request_type")

        if request_type == "FILTER":
            # Filter is used to return list of courses which are for particular majorfield
            majorfield_id = request.GET.get("majorfield_id")

            exams = Exam.objects.filter(field_id=majorfield_id)
            result = {"After 10": {}, "After 12": {}, "Post Graduation": {}}
            for exam in exams:
                if exam.level == "After 10":
                    result["After 10"][exam.id] = exam.name
                elif exam.level == "After 12":
                    result["After 12"][exam.id] = exam.name
                elif exam.level == "Post Graduation":
                    result["Post Graduation"][exam.id] = exam.name
            return Response({"status": "SUCCESS", "data": result})
        elif request_type == "SEARCH":
            name = request.GET.get("name")
            result = Exam.objects.filter(name__icontains=name)
        else:
            result = Exam.objects.all()
        exam_list = []

        for exam in result:
            exam_dict = model_to_dict(exam)
            exam_dict["field_name"] = exam.field.name
            exam_list.append(exam_dict)
        return Response({"status": "SUCCESS", "data": exam_list})

class ExamDetailView(APIView):

    def get(self, request):
        """
        Fetch particular exam details
        :param request: Id of the exam
        :return: exam details in dict format
        """
        exam_id = request.GET.get('exam_id')
        LOGGER.info("exam id:%s", exam_id)
        exam = Exam.objects.get(id=exam_id)
        exam_dict = model_to_dict(exam)
        exam_dict["field_name"] = exam.field.name
        return Response({"status": "SUCCESS", "data": exam_dict})

    def post(self, request):
        """
        Create exam record in database
        :param request: Key value pair data
        :return: status & respective message
        """

        data = request.data

        if "college_ids" in data:
            college_ids = data["college_ids"]
            data.pop("college_ids")

        # Assuming field_id is mandatory as of now
        try:
            exam = Exam(**data)
            exam.save()
            LOGGER.info("exam created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        '''if college_ids:
            for college_id in college_ids:
                college_obj = College.objects.get(college_id)
                exam_college_map = ExamCollegeMap()
                exam_college_map.exam = exam
                exam_college_map.college = college_obj
                exam_college_map.save()'''

        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing exam record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        exam_id = data['exam_id']
        data.pop("exam_id")
        LOGGER.info("exam id:%d", exam_id)
        exam_data = Exam.objects.filter(id=exam_id)

        # TODO - need to check whether UI will send added & deleted colleges separately or all together
        # curretly assuming UI is sending all values together i.e. existing assigned, deleted & newly assigned also
        college_ids = None
        if "college_ids" in data:
            college_ids = data["college_ids"]
            data.pop("college_ids")

        try:
            exam_data.update(**data)
            '''if college_ids:
                ExamCollegeMap.objects.filter(exam=exam_id).delete()
                for college_id in college_ids:
                    mapping = ExamCollegeMap(exam=exam_id, college=college_id)
                    mapping.save()'''
            LOGGER.info("exam data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            # TODO : need to handle exception & rollback accordingly
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested exam record from database
        :param request: Id of the exam
        :return: status & respective message
        """

        data = request.data
        exam_id = data["exam_id"]
        LOGGER.info("exam id:%d", exam_id)
        exam = Exam.objects.get(id=exam_id)
        try:
            #ExamCollegeMap.objects.filter(exam=exam_id).delete()
            exam.delete()
            LOGGER.info("exam deleted successfully")
            return Response({"status": "SUCCESS", "message": "Exam deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete exam"})
