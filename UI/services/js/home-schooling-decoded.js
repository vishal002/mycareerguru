/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('home_schooling_decoded', ['ngWYSIWYG']);

cp.controller('homeSchoolingDecodedCrt', ['$scope', 'allMenuService', '$http', '$log', 'majorFieldsService',
    function ($scope, allMenuService, $http, $log, majorFieldsService) {
        // side menu
        $scope.getSideMenu = function () {
            $scope.sideMenu = ['Work in progress'];
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


