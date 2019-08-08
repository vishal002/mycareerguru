/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;
cp = angular.module('scholarships', ['ngWYSIWYG', 'utilService']);
cp.controller('scholarshipsListCrt', ['$scope', 'allMenuService', '$http', '$log', 'passDataBetweenCrt4Service',
    function ($scope, allMenuService, $http, $log, passDataBetweenCrt4Service) {

        //
        $scope.getList = function () {
                $scope.myPromise = $http.get("/scholarship/scholarshiplist")
                        .success(function (response) {
                            $scope.scholarshipList = response.data;
                        });
        };
        $scope.getList();
        
        $scope.getListBySearch = function (param) {
            if (param.length > 3) {
                $http.get("/scholarship/scholarshiplist?request_type=SEARCH&name=" + param)
                        .success(function (response) {
                            $scope.scholarshipList = response.data;
                        });
            } else {
                
            }
        };
//                        var vm = this;
//                        vm.users = []; //declare an empty array
//                        vm.pageno = 1; // initialize page no to 1
//                        vm.total_count = 0;
//                        vm.itemsPerPage = 10; //this could be a dynamic value from a drop down
//
//                        vm.getData = function (pageno) { // This would fetch the data on page change.
//                        //In practice this should be in a factory.
//                        vm.users = [];
//                                //$http.get("http://code.ciphertrick.com/api/list/page/" + vm.itemsPerPage + "/" + pageno)
//                                $http.get("api/pag.json")
//                                .success(function (response) {
//                                vm.users = response.data; //ajax request to fetch data into vm.data
//                                        vm.total_count = response.total_count;
//                                });
//                        };
//                        //vm.getData(vm.pageno); // Call the function to fetch initial data on page load.

        // get Scholarships in detail function
        $scope.setScholarshipsInDetail = function (param) {
            passDataBetweenCrt4Service.setScholarshipsInService(param);
        };
    }]);
cp.controller('scholarshipsDetailCrt', ['$scope', '$http', 'passDataBetweenCrt4Service',
    '$location', '$anchorScroll', '$routeParams',
    function ($scope, $http, passDataBetweenCrt4Service, $location, $anchorScroll, $routeParams) {

        $scope.param_name = $routeParams.scholarships_name;
        //
        $scope.scholarshipsInDetail = function () {
            $scope.selectedSchool = passDataBetweenCrt4Service.getScholarshipsFromService();
            $http.get('/scholarship/scholarshipdetails?scholarship_id=' + $routeParams.id)
                    .then(function (response) {
                        if (response.status === 200) {
                            $scope.dataDetail = response.data.data;
                        } else {
                            console.log("error occured");
                        }
                    });
        };
        $scope.scholarshipsInDetail();
        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };
        $scope.doneEditing = function (item) {
            // Commenting removing following field as per discussion with Rishikesh.
            delete item.editing;
            delete item.field_name;
            item.scholarship_id = item.id;
            //dong some background ajax calling for persistence...
            $http.put('/scholarship/editScholarship', item)
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

