__author__ = 'adityaa'
from rest_framework.response import Response
from rest_framework.views import APIView
from models import MajorFields
from colleges.models import College
from courses.models import Course
from django.forms.models import model_to_dict
import logging

LOGGER = logging.getLogger("mycareerguru")


class MajorFieldsListView(APIView):
    def get(self, request):
        result = MajorFields.objects.all()
        majorfield_list = []

        for majorfield in result:
            majorfield_dict = model_to_dict(majorfield)
            majorfield_list.append(majorfield_dict)
        return Response({"status": "SUCCESS", "data": majorfield_list})


class MajorFieldsDetailView(APIView):
    def get(self, request):
        majorfield_id = request.GET.get('majorfield_id')
        print "MajorField id:", majorfield_id

        majorfield = MajorFields.objects.get(id=majorfield_id)
        data = model_to_dict(majorfield)
        return Response({"status": "SUCCESS", "data": data})

    def post(self, request):
        """
        Create majorfield record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data

        try:
            majorfield = MajorFields(**data)
            majorfield.save()
            LOGGER.info("MajorField created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing majorfield record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        majorfield_id = data['majorfield_id']
        data.pop("majorfield_id")
        LOGGER.info("majorfield id:%d", majorfield_id)
        majorfield_data = MajorFields.objects.filter(id=majorfield_id)

        try:
            majorfield_data.update(**data)
            LOGGER.info("MajorField data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            #TODO : need to handle exception & rollback accordingly
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested majorfield record from database
        :param request: Id of the majorfield
        :return: status & respective message
        """

        data = request.data
        majorfield_id = data["majorfield_id"]
        LOGGER.info("majorfield id:%d", majorfield_id)
        try:
            MajorFields.objects.filter(id=majorfield_id).delete()
            LOGGER.info("MajorField deleted successfully")
            return Response({"status": "SUCCESS", "message": "Majorfield deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete Majorfield"})


class MajorfieldMappingView(APIView):
    def get(self, request):
        majorfield_data = MajorFields.objects.all()

        data = {}
        for field in majorfield_data:
            data[field.id] = {"name": field.name,"courses": [], "exams": [], "career_options": [], "colleges": []}
            courses = field.course_set.all()

            college_set = set()
            for course in courses:
                data[field.id]["courses"].append({"id": course.id, "name": course.name})

                colleges = College.objects.filter(courses__id=course.id)
                for college in colleges:
                    if college.id not in college_set:
                        data[field.id]["colleges"].append({"id": college.id, "name": college.name})
                        college_set.add(college.id)


            exams = field.exam_set.all()
            for exam in exams:
                data[field.id]["exams"].append({"id": exam.id, "name": exam.name})
            career_options = field.careeroption_set.all()
            for career in career_options:
                data[field.id]["career_options"].append({"id": career.id, "name": career.name})

        return Response({"status": "SUCCESS", "data": data})