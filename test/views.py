__author__ = 'rishikesht'

from rest_framework.response import Response
from rest_framework.views import APIView
import logging
from django.forms.models import model_to_dict
from test.models import UserTestHistory, TestType, TestSubType, Questions

LOGGER = logging.getLogger("mycareerguru")


class UserTestListView(APIView):

    def get(self, request):
        """
        To retrieve all cities list
        """
        result = UserTestHistory.objects.all()
        user_test_history = [model_to_dict(test) for test in result]
        return Response({"status": "SUCCESS", "data": user_test_history})


class UserTestDetailsView(APIView):

    def get(self, request):
        """
        Retrieve test details
        """

        id = request.GET.get("test_id")
        result = UserTestHistory.objects.get(id=id)
        data = model_to_dict(result)
        return Response({"status": "SUCCESS", "data": data})

    def post(self, request):
        """
        Create test record in database
        :param request: Key value pair data
        :return: status & respective message
        """

        data = request.data

        try:
            user_test = UserTestHistory(**data)
            user_test.save()
            LOGGER.info("Test created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing test record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        test_id = data['test_id']
        data.pop("test_id")
        test_data = UserTestHistory.objects.filter(id=test_id)

        try:
            test_data.update(**data)
            LOGGER.info("Test data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested test record from database
        :param request: Id of the test
        :return: status & respective message
        """

        data = request.data
        test_id = data["test_id"]
        LOGGER.info("test id:%d", test_id)

        try:
            UserTestHistory.objects.get(id=test_id).delete()
            LOGGER.info("Test deleted successfully")
            return Response({"status": "SUCCESS", "message": "Test deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete Test"})


class TestTypeView(APIView):

    def get(self, request):
        """
        Retrieve test types
        """

        request_type = request.GET.get("request_type")
        data = []
        if request_type == "ALL":
            result = TestType.objects.all()
            for test_type in result:
                test_data = model_to_dict(test_type)
                test_data['test_type_id'] = test_type.id
                data.append(test_data)
        else:
            id = request.GET.get("test_type_id")
            result = TestType.objects.get(id=id)
            data = model_to_dict(result)
        return Response({"status": "SUCCESS", "data": data})

    def post(self, request):
        """
        Create test type record in database
        :param request: Key value pair data
        :return: status & respective message
        """

        data = request.data

        try:
            test_type = TestType(**data)
            test_type.save()
            LOGGER.info("Test type created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing test type record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        test_type_id = data['test_type_id']
        data.pop("test_type_id")
        test_type = TestType.objects.filter(id=test_type_id)

        try:
            test_type.update(**data)
            LOGGER.info("Test type data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested test type record from database
        :param request: Id of the test
        :return: status & respective message
        """

        data = request.data
        test_type_id = data["test_type_id"]
        LOGGER.info("test type id:%d", test_type_id)

        try:
            TestType.objects.get(id=test_type_id).delete()
            LOGGER.info("Test type deleted successfully")
            return Response({"status": "SUCCESS", "message": "Test type deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete Test type"})


class TestSubTypeView(APIView):

    def get(self, request):
        """
        Retrieve test types
        """

        request_type = request.GET.get("request_type")
        data = []
        if request_type == "ALL":
            result = TestSubType.objects.all()
            for test_sub_type in result:
                test_data = model_to_dict(test_sub_type)
                test_data["test_type"] = test_sub_type.test_type.test_type
                test_data["test_type_id"] = test_sub_type.test_type.id
                test_data["test_sub_type_id"] = test_sub_type.id
                data.append(test_data)
        else:
            id = request.GET.get("test_sub_type_id")
            result = TestSubType.objects.get(id=id)
            data = model_to_dict(result)
            data["test_type"] = result.test_type.test_type
        return Response({"status": "SUCCESS", "data": data})

    def post(self, request):
        """
        Create test type record in database
        :param request: Key value pair data
        :return: status & respective message
        """

        data = request.data

        try:
            test_sub_type = TestSubType(**data)
            test_sub_type.save()
            LOGGER.info("Test sub type created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing test type record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        test_sub_type_id = data['test_sub_type_id']
        data.pop("test_sub_type_id")
        test_sub_type = TestSubType.objects.filter(id=test_sub_type_id)

        try:
            test_sub_type.update(**data)
            LOGGER.info("Test sub type data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested test type record from database
        :param request: Id of the test
        :return: status & respective message
        """

        data = request.data
        test_sub_type_id = data["test_sub_type_id"]
        LOGGER.info("test type id:%d", test_sub_type_id)

        try:
            TestSubType.objects.get(id=test_sub_type_id).delete()
            LOGGER.info("Test sub type deleted successfully")
            return Response({"status": "SUCCESS", "message": "Test sub type deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete Test sub type"})


class QuestionView(APIView):

    def get(self, request):
        """
        Retrieve Questions
        """

        request_type = request.GET.get("request_type")
        data = []
        if request_type == "ALL":
            result = Questions.objects.all()
            for question in result:
                test_data = model_to_dict(question)
                test_data["test_type"] = question.sub_test_type.test_type.test_type
                test_data["sub_test_type"] = question.sub_test_type.sub_test_type
                test_data["question_id"] = question.id
                test_data["test_type_id"] = question.sub_test_type.test_type.id
                test_data["test_sub_type_id"] = question.sub_test_type.id
                data.append(test_data)
        else:
            id = request.GET.get("question_id")
            result = Questions.objects.get(id=id)
            data = model_to_dict(result)
            data["test_type"] = result.sub_test_type.test_type.test_type
            data["sub_test_type"] = result.sub_test_type.sub_test_type
        return Response({"status": "SUCCESS", "data": data})

    def post(self, request):
        """
        Create Question record in database
        :param request: Key value pair data
        :return: status & respective message
        """

        data = request.data

        try:
            Question = Questions(**data)
            Question.save()
            LOGGER.info("Question created successfully")
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})
        return Response({"status": "SUCCESS", "message": "Record saved successfully"})

    def put(self, request):
        """
        Update existing Question record in database
        :param request: Key value paired data
        :return: status & respective message
        """

        data = request.data
        question_id = data['question_id']
        data.pop("question_id")
        Question = Questions.objects.filter(id=question_id)

        try:
            Question.update(**data)
            LOGGER.info("Question data updated successfully")
            return Response({"status": "SUCCESS", "message": "Record updated successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": str(error)})

    def delete(self, request):
        """
        Delete requested Question record from database
        :param request: Id of the test
        :return: status & respective message
        """

        data = request.data
        question_id = data["question_id"]
        LOGGER.info("Question id:%d", question_id)

        try:
            Questions.objects.get(id=question_id).delete()
            LOGGER.info("Question deleted successfully")
            return Response({"status": "SUCCESS", "message": "Question deleted successfully"})
        except Exception, error:
            LOGGER.error("Error:%s", str(error))
            return Response({"status": "FAILED", "message": "Failed to delete Question"})
