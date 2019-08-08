/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('home_schooling', ['ngWYSIWYG']);

cp.controller('homeSchoolingCrt', ['$scope', 'allMenuService', '$http', '$log', 'majorFieldsService',
    function ($scope, allMenuService, $http, $log, majorFieldsService) {
        // side menu
        $scope.getSideMenu = function () {
            $scope.sideMenu = ['About HomeSchooling', 'HomeSchooling What, Why & How?',
                'Myths about Homeschooling?', 'Advantages & Disadvantages', 'Where to Start?',
                'How we can be of help?'];
        };
        $scope.getSideMenu();

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


