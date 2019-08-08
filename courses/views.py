__author__ = 'jayeshd'
from rest_framework.response import Response
from rest_framework.views import APIView
from models import Course
from django.forms.models import model_to_dict
import logging

LOGGER = logging.getLogger("mycareerguru")


class CourseListView(APIView):
    def get(self, request):
        request_type = request.GET.get("request_type")
        if request_type == "FILTER":
            # Filter is used to return courses which are for particular majorfield
            majorfield_id = request.GET.get("majorfield_id")
            result = Course.objects.filter(majorfield_id=majorfield_id)

            final_result = {"After 10": {}, "After 12": {}, "Post Graduation": {}}
            for course in result:
                if course.level == "After 10":
                    final_result["After 10"][course.id] = course.name
                elif course.level == "After 12":
                    final_result["After 12"][course.id] = course.name
                elif course.level == "Post Graduation":
                    final_result["Post Graduation"][course.id] = course.name
            return Response({"status": "SUCCESS", "data": final_result})
        elif request_type == "SEARCH":
            name = request.GET.get("name")
            result = Course.objects.filter(name__icontains=name)
        else:
            result = Course.objects.all()
        course_list = []
        for course in result:
            course_dict = model_to_dict(course)
            course_list.append(course_dict)
        return Response({"status": "SUCCESS", "data": course_list})


class CourseDetailView(APIView):
    def get(self, request):
        course_id = request.GET.get('course_id')
        print "Course id:", course_id

        course = Course.objects.get(id=course_id)
        data = model_to_dict(course)
        return Response({"status": "SUCCESS", "data": data})

    def post(self, request):
        """
        Create course record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        majorfield_ids = None
        if "majorfield_ids" in data:
            majorfield_ids = data["majorfield_ids"]
            data.pop("majorfield_ids")

        try:
            course = Course(**data)
            course.save()
            LOGGER.info("Course created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        '''if majorfield_ids:
            for major_field_id in majorfield_ids:
                course_obj = Course.objects.get(major_field_id)
                course_majorfield_map = CourseMajorFieldsMap()
                course_majorfield_map.field = major_field_id
                course_majorfield_map.course = course_obj
                course_majorfield_map.save()'''

        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing course record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        course_id = data['course_id']
        data.pop("course_id")
        LOGGER.info("course id:%d", course_id)
        course_data = Course.objects.filter(id=course_id)

        #TODO - need to check whether UI will send added & deleted courses separately or all together
        #curretly assuming UI is sending all values together i.e. existing assigned, deleted & newly assigned also
        field_ids = []
        if "majorfield_ids" in data:
            field_ids = data["majorfield_ids"]
            data.pop("majorfield_ids")

        try:
            course_data.update(**data)
            '''if field_ids:
                CourseMajorFieldsMap.objects.filter(course=course_id).delete()
                for field_id in field_ids:
                    mapping = CourseMajorFieldsMap(course=course_id, field=field_id)
                    mapping.save()'''
            LOGGER.info("Course data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            #TODO : need to handle exception & rollback accordingly
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested course record from database
        :param request: Id of the course
        :return: status & respective message
        """

        data = request.data
        course_id = data["course_id"]
        LOGGER.info("course id:%d", course_id)
        course = Course.objects.get(id=course_id)
        try:
            #CourseMajorFieldsMap.objects.filter(course=course_id).delete()
            course.delete()
            LOGGER.info("Course deleted successfully")
            return Response({"status": "SUCCESS", "message": "course deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete course"})
