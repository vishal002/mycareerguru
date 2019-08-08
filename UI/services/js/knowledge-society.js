/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('knowledge_society', ['ngWYSIWYG']);

cp.controller('knowledgeSocietyCrt', ['$scope', 'allMenuService', '$http', '$log', 'majorFieldsService',
    function ($scope, allMenuService, $http, $log, majorFieldsService) {
        // side menu
        $scope.getSideMenu = function () {
            $scope.sideMenu = ['Work in progree'];
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


