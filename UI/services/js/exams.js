/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('exams', ['ngWYSIWYG', 'utilService']);

cp.controller('examMobileMenuCrt', function ($scope, $routeParams, $http) {

    $scope.listAfterX = [];
    $scope.listAfterXII = [];
    $scope.listAfterUGDegree = [];
    $scope.selectedMF = $routeParams.mf_id;

    $http.get('/course/courselist?request_type=FILTER&majorfield_id=' + $routeParams.mf_id)
            .then(function (response) {
                $scope.listAfterX = response.data.data["After 10"];
                $scope.listAfterXII = response.data.data["After 12"];
                $scope.listAfterUGDegree = response.data.data["Post Graduation"];

                $scope.a_10 = 'After%10';
                $scope.a_12 = 'After%12';
                $scope.pg = 'Post%Graduation';

            });


});

cp.controller('examListController', ['$scope', 'allMenuService', '$http', '$log',
    'passDataBetweenCrt2Service', '$routeParams',
    function ($scope, allMenuService, $http, $log, passDataBetweenCrt2Service,
            $routeParams) {
        //
        $scope.toolTipFun = function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        };

        $scope.param_name = $routeParams.course_name;
        $scope.param_id = $routeParams.course_id;

        //
        $scope.getExamList = function () {
            $scope.field_name_list = [];
            var temp = [];
            if ($routeParams.exam_name !== undefined) {
                $scope.myPromise = $http.get('/exam/examlist?request_type=SEARCH&&name=' + $routeParams.exam_name)
                        .then(function (response) {
                            if (response.status === 200) {
                                $scope.examList = response.data.data;
                            }
                        });
            } else {
                $scope.myPromise = $http.get("/exam/examlist")
                        .success(function (response) {
                            if ((response.data).length !== 0) {
                                $scope.examList = response.data;
                                //
                                for (var i = 0; i < $scope.examList.length; i++) {
                                    temp.push($scope.examList[i].field_name)
                                    $scope.field_name_list = _.uniq(temp);
                                }
                                $scope.msg = '';
                            } else {
                                $scope.msg = "No Record Found!";
                            }

                        });
            }
        };
        $scope.getExamList();

        $scope.majorFieldsList = function () {
            $http.get("/majorfields/majorfieldslist")
                    .success(function (response) {
                        console.log(response.message);
                        $scope.majorFieldsExams = response.data;
                    });
        };

        $scope.majorFieldsList();

        var vm = this;
        vm.users = []; //declare an empty array
        vm.pageno = 1; // initialize page no to 1
        vm.total_count = 0;
        vm.itemsPerPage = 10; //this could be a dynamic value from a drop down

        vm.getData = function (pageno) { // This would fetch the data on page change.
            //In practice this should be in a factory.
            vm.users = [];
            //$http.get("http://code.ciphertrick.com/api/list/page/" + vm.itemsPerPage + "/" + pageno)
            $http.get("api/pag.json")
                    .success(function (response) {
                        vm.users = response.data;  //ajax request to fetch data into vm.data
                        vm.total_count = response.total_count;
                    });
        };
        // vm.getData(vm.pageno); // Call the function to fetch initial data on page load.

        // get collage in detail function
        $scope.setExamInDetail = function (param) {
            passDataBetweenCrt2Service.setExamInService(param);
        };

        $scope.majorFieldFilterValue = '';
        $scope.filterOnMajorFields = function (name) {
            $scope.majorFieldFilterValue = name;
        };

    }]);

cp.controller('examDetailController', ['$scope', '$http', 'passDataBetweenCrt2Service', '$location', '$anchorScroll', '$routeParams',
    function ($scope, $http, passDataBetweenCrt2Service, $location, $anchorScroll, $routeParams) {

        $scope.toolTipFun = function () {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        };

        // old data.
        var dataDetailOld;

        // menu json
        $scope.menu_list = [
            {"sub_id": "1", "sub_menu": "About / Overview of the Exam"},
            {"sub_id": "2", "sub_menu": "Date of Exam"},
            {"sub_id": "3", "sub_menu": "Duration of the Exam"},
            {"sub_id": "4", "sub_menu": "Conducting Body"},
            {"sub_id": "5", "sub_menu": "Exam Fee"},
            {"sub_id": "6", "sub_menu": "Mode of Exam"},
            {"sub_id": "7", "sub_menu": "Pattern of the Exam"},
            {"sub_id": "8", "sub_menu": "Exam Level: UG/PG"},
            {"sub_id": "9", "sub_menu": "Exam Type"},
            {"sub_id": "10", "sub_menu": "Application Date"},
            {"sub_id": "11", "sub_menu": "Eligibility"},
            {"sub_id": "12", "sub_menu": "Exam Centers"},
            {"sub_id": "13", "sub_menu": "Total Students appear"},
            {"sub_id": "14", "sub_menu": "Total number of seats"},
            {"sub_id": "15", "sub_menu": "Syallbus"},
            {"sub_id": "16", "sub_menu": "How to prepare?"},
            {"sub_id": "17", "sub_menu": "Books recommended"}
        ];

        //
        $scope.examInDetail = function () {
            $scope.selectedExam = passDataBetweenCrt2Service.getExamFromService();
            var examDetaFromApi;
            $http.get('/exam/examdetails?exam_id=' + $routeParams.exam_id)
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
        $scope.examInDetail();

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            // Commenting removing following field as per discussion with Rishikesh.
            delete item.editing;
            delete item.field_name;

            item.exam_id = item.id;
            //dong some background ajax calling for persistence...
            $http.put('/exam/editExam', item)
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

