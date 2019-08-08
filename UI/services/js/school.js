/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('school', ['ngWYSIWYG', 'utilService']);

cp.controller('schoolListCrt', ['$scope', 'allMenuService', '$http', '$log', 'passDataBetweenCrt3Service',
    function ($scope, allMenuService, $http, $log, passDataBetweenCrt3Service) {
        //
        $scope.toolTipFun = function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        };

        //
        $scope.getSchoolList = function () {
            $scope.field_board_list = [];
            var temp = [];

            $http.get("/school/schoollist")
                    .success(function (response) {
                        $scope.schoolList = response.data;
                        //
                        for (var i = 0; i < $scope.schoolList.length; i++) {
                            temp.push($scope.schoolList[i].board)
                            $scope.field_board_list = _.uniq(temp);
                        }
                    });
        };
        $scope.getSchoolList();

        $scope.majorFieldsList = function () {
            $http.get("/majorfields/majorfieldslist")
                    .success(function (response) {
                        $scope.majorFieldsList = response.data;
                    });
        };

        $scope.majorFieldsList();

        // get collage in detail function
        $scope.setSchoolInDetail = function (param) {
            passDataBetweenCrt3Service.setSchoolInService(param);
        };

    }]);

cp.controller('schoolDetailCrt', ['$scope', '$http', 'passDataBetweenCrt3Service', '$location',
    '$anchorScroll', '$routeParams',
    function ($scope, $http, passDataBetweenCrt3Service, $location, $anchorScroll, $routeParams) {
        // $scope.selectedSchool = passDataBetweenCrt3Service.getSchoolFromService();
        // old data.

        //
        $scope.toolTipFun = function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        };

        $scope.paramSchoolName = $routeParams.school_name;
        var dataDetailOld;

        // menu json
        $scope.menu_list = [
            {"sub_id": "1", "sub_menu": "About/Overview"},
            {"sub_id": "2", "sub_menu": "Other info"},
            {"sub_id": "3", "sub_menu": "Board"},
            {"sub_id": "4", "sub_menu": "Contact"}
        ];

        //
        $scope.schoolInDetail = function () {
            $scope.selectedSchool = passDataBetweenCrt3Service.getSchoolFromService();
            var examDetaFromApi;
            $http.get('/school/schooldetails?school_id=' + $routeParams.school_id)
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response.data.data);
                            $scope.dataDetail = response.data.data;
                            dataDetailOld = JSON.parse(JSON.stringify($scope.dataDetail));
                        } else {
                            console.log("error occured");
                        }
                    });
        };
        $scope.schoolInDetail();

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            // Commenting removing following field as per discussion with Rishikesh.
            delete item.editing;
            delete item.field_name;

            item.school_id = item.id;
            //dong some background ajax calling for persistence...
            $http.put('/school/editSchool', item)
                    .success(function (data, status, headers, config) {
                        console.log("updates successfully");
                    })
                    .error(function (data, status, header, config) {
                        console.log("some errror occured");
                    });


        };

        $scope.cancelEditing = function (item) {
            item.editing = false;
            $scope.dataDetail = dataDetailOld;
            $scope.setContent();
        };


        // for editor
        $scope.tinymceModel = 'Initial content';

        $scope.getContent = function () {
            console.log('Editor content:', $scope.tinymceModel);
            $scope.data = $scope.tinymceModel;
        };

        $scope.setContent = function () {
            $scope.tinymceModel = 'Time: ' + (new Date());
        };

        $scope.tinymceOptions = {
            plugins: ['advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: '//www.tinymce.com/css/codepen.min.css'
        };

        $scope.scrollTo = function (id) {
            $location.hash(id);
            console.log($location.hash());
            $anchorScroll();
        };

    }]);

