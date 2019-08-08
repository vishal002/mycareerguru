/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('pro_mentoring', ['ngWYSIWYG']);

cp.controller('proMentoringCrt', ['$scope', 'allMenuService', '$http', '$log',
    function ($scope, allMenuService, $http, $log) {

        // side menu
        $scope.sideMenu = [{"sub_id": "1", "sub_menu": "Importance of mentorship"}];



        //
        $scope.getMenuContent = function (sub_id, index) {
            // logic for current selected
            $scope.currentSelected = index;

            // api call to fetch content of selected menu
            if (sub_id == 1) {
                $http.get('/static/api/menuContent_PM.json?menu_id=' + sub_id)
                        .then(function (response) {
                            $scope.content = response.data;
                        });
            }
        };
        $scope.getMenuContent(1, 0);

        //
        $scope.getMentorList = function () {
            $http.get('/static/api/mentor_list.json')
                    .then(function (response) {
                        $scope.mentor_list = response.data;
                    });
        };
        $scope.getMentorList();


        //
        $scope.editorConfig = {
            fontAwesome: true
        };
        $scope.api = {
            scope: $scope
        };
        $scope.$watch('content', function (newValue) {
            $log.info(newValue);
        });




    }]);




