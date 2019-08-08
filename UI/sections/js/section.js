/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular, secApp;

secApp = angular.module('section', ['utilService']);

secApp.controller('sectionCrt', ['$scope', '$timeout', 'allMenuService', '$http',
    '$location', '$routeParams',
    function ($scope, $timeout, allMenuService, $http, $location, $routeParams) {

        $scope.loadMenu = function () {
            // MENU MOBILE =========
            // Collpsable menu mobile and tablets
            $("#megamenu-button-mobile").click(function () {
                $(".megamenu").slideToggle(400);
                $(this).toggleClass(".active");
            });

            // DROP DOWN MENU TABS ====================================== //
            $('body').on('click', 'ul.tabs > li > a', function (e) {
                //Get Location of tab's content
                var contentLocation = $(this).attr('href');
                //Let go if not a hashed one
                if (contentLocation.charAt(0) == "#") {
                    e.preventDefault();
                    //Make Tab Active
                    $(this).parent().siblings().children('a').removeClass('active');
                    $(this).addClass('active');
                    //Show Tab Content & add active class
                    $(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
                }
            });
        };

        //
        $scope.loginLogoutClick = function () {
            $location.path('/login');
        };
        
        //
        var majorFieldsList = function () {
            $http.get("/majorfields/majorfieldslist")
                    .success(function (response) {
                        $scope.majorFieldsExams = response.data;
                    });
        };

        $scope.upperMenu = function () {
            //
            var promise = allMenuService.getMenuList();
            promise.then(function (response) {
                if (response.status === 200) {
                    $scope.allMenu = response.data;

                } else {
                    console.log(response.statusText);
                }
            });
            majorFieldsList();

            $timeout($scope.loadMenu, 15);
        };
        $scope.upperMenu();

        var carrerPlanningSubMenu = function () {
            $http.get('/careeroption/planninglist')
                    .then(function (response) {
                        $scope.carrerPlanningSideMenu = response.data.data;
                    });
        };
        carrerPlanningSubMenu();

        //
        $scope.selectedMenu = $routeParams.selectedMenu;

        $scope.getOtherMenuForDesktop = function (param1, index) {
            $scope.curr_sel_index = index;
            $scope.listAfterX = [];
            $scope.listAfterXII = [];
            $scope.listAfterUGDegree = [];
            $scope.selectedMF = param1;

            $scope.count_list = 10;
            $scope.count_length = 50;
            $scope.count_explore_btn = 10;

            $http.get('/course/courselist?request_type=FILTER&majorfield_id=' + param1)
                    .then(function (response) {
                        $scope.listAfterX = response.data.data["After 10"];
                        $scope.listAfterX_length = Object.keys($scope.listAfterX).length;
                        $scope.listAfterXII = response.data.data["After 12"];
                        $scope.listAfterXII_length = Object.keys($scope.listAfterXII).length;
                        $scope.listAfterUGDegree = response.data.data["Post Graduation"];
                        $scope.listAfterUGDegree_length = Object.keys($scope.listAfterUGDegree).length;

                        $scope.a_10 = 'After 10';
                        $scope.a_12 = 'After 12';
                        $scope.pg = 'Post Graduation';

                    });
        };
        $scope.getOtherMenuForDesktop(1, 0);

        $scope.getOtherMenu = function (param1, param2) {
            $scope.listAfterX = [];
            $scope.listAfterXII = [];
            $scope.listAfterUGDegree = [];
            $scope.selectedMF = param1;

            $http.get('/course/courselist?request_type=FILTER&majorfield_id=' + param2)
                    .then(function (response) {
                        $scope.listAfterX = response.data.data["After 10"];
                        $scope.listAfterXII = response.data.data["After 12"];
                        $scope.listAfterUGDegree = response.data.data["Post Graduation"];

                        $scope.a_10 = 'After 10';
                        $scope.a_12 = 'After 12';
                        $scope.pg = 'Post Graduation';

                    });
        };

        // top search for collage career exam course
        $scope.mainSearch = function (search_type, search_name) {
            if (search_name.length > 3 && search_type !== undefined) {
                if (search_type === 'colleges') {
                    $http.get('/college/collegelist?request_type=SEARCH&&name=' + search_name)
                            .then(function (response) {
                                $scope.dataList = response.data.data;
                            });
                }
                if (search_type === 'course') {
                    $http.get('/course/courselist?request_type=SEARCH&&name=' + search_name)
                            .then(function (response) {
                                $scope.dataList = response.data.data;
                            });
                }
                if (search_type === 'exams') {
                    $http.get('/exam/examlist?request_type=SEARCH&&name=' + search_name)
                            .then(function (response) {
                                $scope.dataList = response.data.data;
                            });
                }
            } else {
                $scope.dataList = [];
            }
        };

        $scope.redirectFun = function (search_type, search_name, search_id) {
            if (search_type === 'colleges') {
                $scope.dataList = [];
                $scope.search_name = '';
                $scope.search_type = '';
                window.location.href = '#/services/colleges/colleges-list/' + search_name;
            }
            if (search_type === 'course') {
                $scope.dataList = [];
                $scope.search_name = '';
                $scope.search_type = '';
                window.location.href = '#/services/courses/' + search_name + '/' + search_id;
            }
            if (search_type === 'exams') {
                $scope.dataList = [];
                $scope.search_name = '';
                $scope.search_type = '';
                window.location.href = '#/services/entrance_and_scholarship_exams_list/' + search_name;
            }

        };


    }]);

secApp.controller('footerCrt', ['$scope', 'footerMenuService',
    function ($scope, footerMenuService) {
        //
        var promise = footerMenuService.getMenuList();
        promise.then(function (response) {
            $scope.allMenu = response;
        });
    }]);

secApp.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    };
});

secApp.controller('aboutUsController', ['$scope', '$http', function ($scope, $http) {
        $scope.getDetail = function () {
            // api call for item in detail
            $http.get('')
                    .then(function (response) {
                        if (response.status === 200) {
                            $scope.dataDetail = response.data.data;
                            dataDetailOld = JSON.parse(JSON.stringify($scope.dataDetail));
                        }
                    });
        };
        $scope.getDetail();

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            item.editing = false;
            //dong some background ajax calling for persistence...
            $http.put('' + item)
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

    }]);
