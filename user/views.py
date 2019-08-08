__author__ = 'rishikesht'
from .models import City, Guidance, HeardAboutMCG, Education
from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from django.forms.models import model_to_dict
from test.models import UserTestHistory
from django.contrib.auth.models import User, Group
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

LOGGER = logging.getLogger("mycareerguru")


class CityListView(APIView):

    def get(self, request):
        """
        To retrieve all cities list
        """
        result = City.objects.all()
        city_list = [model_to_dict(city) for city in result]
        return Response({"status": "SUCCESS", "data": city_list})


class GuidanceListView(APIView):

    def get(self, request):
        """
        To retrieve guidance fields list
        """
        result = Guidance.objects.all()
        guidance_list = [model_to_dict(guidance) for guidance in result]
        return Response({"status": "SUCCESS", "data": guidance_list})


class EducationListView(APIView):

    def get(self, request):
        """
        To retrieve all Educations list
        """
        result = Education.objects.all()
        education_list = [model_to_dict(education) for education in result]
        return Response({"status": "SUCCESS", "data": education_list})


class HeardFromListView(APIView):

    def get(self, request):
        """
        To retrieve all heart from resources list
        """
        result = HeardAboutMCG.objects.all()
        resources_list = [model_to_dict(resource) for resource in result]
        return Response({"status": "SUCCESS", "data": resources_list})


class UserDetailView(APIView):

    def get(self, request):
        """
        Fetch particular user details
        :param request: Id of the user
        :return: user details in dict format
        """
        user_id = request.GET.get('user_id')
        LOGGER.info("user id:%s", user_id)
        user = User.objects.get(id=user_id)
        user_dict = model_to_dict(user)
        return Response({"status": "SUCCESS", "data": user_dict})

    def post(self, request):
        """
        Create user record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            password = data["password"]
            data.pop("password")
            user = User(**data)
            user.set_password(password)
            user.save()

            LOGGER.info("user created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing user record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        user_id = data['user_id']
        data.pop("user_id")
        LOGGER.info("user id:%d", user_id)
        user_data = User.objects.filter(id=user_id)

        try:
            user_data.update(**data)
            LOGGER.info("user data updated successfully")
            return Response({"status": "SUCCESS", "message": "User details updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})


    def delete(self, request):
        """
        Delete requested user record from database
        :param request: Id of the user
        :return: status & respective message
        """

        data = request.data
        user_id = data["user_id"]
        LOGGER.info("user id:%d", user_id)
        try:
            UserTestHistory.objects.filter(user_id=user_id).delete()
            User.object.get(id=user_id).delete()
            LOGGER.info("user deleted successfully")
            return Response({"status": "SUCCESS", "message": "user deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete user"})


class UserGroupView(APIView):

    def get(self, request):
        """
        Fetch particular group details
        :param request: Id of the group
        :return: group details in dict format
        """
        groups = Group.objects.all()
        groupList = []
        for group in groups:
            groupList.append(model_to_dict(group))
        return Response({"status": "SUCCESS", "data": groupList})

    def post(self, request):
        """
        Create group record in database
        :param request: Key value pair data
        :return: status & respective message
        """
        data = request.data
        try:
            group = Group(**data)
            group.save()
            LOGGER.info("group created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing group record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        group_id = data['group_id']
        data.pop("group_id")
        LOGGER.info("group id:%d", group_id)
        group_data = Group.objects.filter(id=group_id)

        try:
            group_data.update(**data)
            LOGGER.info("group data updated successfully")
            return Response({"status": "SUCCESS", "message": "User details updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})


    def delete(self, request):
        """
        Delete requested group record from database
        :param request: Id of the group
        :return: status & respective message
        """

        data = request.data
        group_id = data["group_id"]
        LOGGER.info("group id:%d", group_id)
        try:
            User.objects.filter(group__group_id=group_id).delete()
            Group.object.get(id=group_id).delete()
            LOGGER.info("group deleted successfully")
            return Response({"status": "SUCCESS", "message": "group deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete group"})


class UserAuthView(APIView):
    def post(self, request):
        data = request.data
        email_id = data["username"]
        user_data = User.objects.filter(email__iexact=email_id)[0]
        print "Dir:", dir(user_data)
        username = user_data.username
        password  = data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"status": "SUCCESS"})
        else:
            return Response({"status": "FAILED"})

    def delete(self, request):
        logout(request)
        return Response({"status": "SUCCESS"})
