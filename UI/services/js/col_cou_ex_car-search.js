/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('col_cou_ex_car_search', ['ngWYSIWYG', 'utilService']);

cp.controller('listController', ['$scope', 'allMenuService', '$http', '$log', 'passDataBetweenCrt2Service',
    function ($scope, allMenuService, $http, $log, passDataBetweenCrt2Service) {

        $scope.majorFieldsList = function () {
            $scope.myPromise = $http.get("/majorfields/majorFieldMappings")
                    .success(function (response) {
                        $scope.majorFieldsExams = response.data;
                    });
        };
        $scope.majorFieldsList();

        $scope.courseInDetail = function (id) {
            window.location.href = '#/services/courses/course_name/'+ id;
                                               
        };
        $scope.careersInDetail = function (id) {
            window.location.href = '#/services/career-planning/explore-different-careers/career_name/'+ id;
                                               
        };
        $scope.collegesInDetail = function (id) {
            window.location.href = '#/services/colleges/'+ id;
                                               
        };
        $scope.examsInDetail = function (id) {
            window.location.href = '#/services/exams/exams/'+ id+'/exam_name';
                                               
        };

    }]);

