var app, angular;

app = angular.module('colleges', ['utilService', 'cgBusy', 'angular-svg-round-progressbar',
    'ui.tinymce']);

app.controller('collageMobileMenuCrt', function ($scope, $routeParams, $http) {

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

app.directive("owlCarousel", function () {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function (element) {
                // provide any default options you want
                var defaultOptions = {
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for (var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
});
app.directive('owlCarouselItem', [function () {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }]);


app.controller('collageListCrt', ['$scope', '$http', 'passDataBetweenCrtService',
    '$routeParams',
    function ($scope, $http, passDataBetweenCrtService, $routeParams) {

        $scope.param_name = $routeParams.course_name;
        $scope.param_id = $routeParams.course_id;
        var sub_filter = $routeParams.sub_filter;
        var selectedMF = $routeParams.selectedMF;
        console.log(sub_filter + "sub_filter");

        // get collage in detail function
        $scope.getCollageInDetail = function (param) {
            passDataBetweenCrtService.setCollegeInService(param);
        };

        // get collage list
        $scope.getList = function () {
            if ($routeParams.search_name !== undefined) {
                $http.get('/college/collegelist?request_type=SEARCH&&name=' + $routeParams.search_name)
                        .then(function (response) {
                            if (response.status === 200) {
                                $scope.dataList = response.data.data;
                            }
                        });
            } else if(sub_filter === undefined && selectedMF === undefined && $scope.param_id === undefined) {
                $http.get('/college/collegelist?request_type=ALL')
                        .then(function (response) {
                            if (response.status === 200) {
                                if ((response.data.data).length !== 0) {
                                    $scope.dataList = response.data.data;
                                    $scope.msg = '';
                                } else {
                                    $scope.msg = "No Record Found!";
                                }
                            }
                        });
            } else {
                $scope.myPromise = $http.get('/college/collegelist?request_type=FILTER&leval=' + sub_filter + '&majorfield_id=' + selectedMF + '&course_id=' + $scope.param_id)
                        //$scope.myPromise = $http.get('/college/collegelist')
                        .then(function (response) {
                            if (response.status === 200) {
                                if ((response.data.data).length !== 0) {
                                    $scope.dataList = response.data.data;
                                    $scope.msg = '';
                                } else {
                                    $scope.msg = "No Record Found!";
                                }
                            }
                        });
            }
        };
        $scope.getList();
        
        $scope.majorFieldsList = function () {
            $http.get("/majorfields/majorfieldslist")
                    .success(function (response) {
                        $scope.majorFieldsList = response.data;
                    });
        };
        $scope.majorFieldsList();
        

        // dummy json not used
        data1 = [{"logo_img": "", "rank_index": "", "name": "", "city": "", "state": "", "branch": "",
                "duaration": "", "institute_type": "", "fees": "",
                "plac_avg": "", "plac_higest": "", "college_id": ""}];

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

app.controller('collageDetailCrt', ['$scope', '$http', 'passDataBetweenCrtService',
    'fileUpload', '$routeParams', '$window',
    function ($scope, $http, passDataBetweenCrtService, fileUpload, $routeParams, $window) {
        
        //
        $scope.param_name = $routeParams.college_name;
        // old data.
        var dataDetailOld;

        // menu json
        $scope.menu_list = [{"sub_id": "1", "sub_menu": "About / Overview"}, {"sub_id": "2", "sub_menu": "Courses Offered"},
            {"sub_id": "3", "sub_menu": "Courses & Branches"}, {"sub_id": "4", "sub_menu": "Eligibility"},
            {"sub_id": "5", "sub_menu": "Admission process"}, {"sub_id": "6", "sub_menu": "Fees"},
            {"sub_id": "7", "sub_menu": "Visiting companies"}, {"sub_id": "8", "sub_menu": "Naac Rating"},
            {"sub_id": "9", "sub_menu": "Scholarship and Finance"},
            {"sub_id": "10", "sub_menu": "Facilities"}, {"sub_id": "11", "sub_menu": "Rank Index"}, {"sub_id": "12", "sub_menu": "Avg Salary"},
            {"sub_id": "13", "sub_menu": "Faculty"}, {"sub_id": "14", "sub_menu": "Placements"}, {"sub_id": "15", "sub_menu": "Cutoffs"},
            {"sub_id": "16", "sub_menu": "Remarks"}, {"sub_id": "17", "sub_menu": "Noted Alumni"}, {"sub_id": "18", "sub_menu": "Contact"}
        ]
//        data2 = [{
//                "college_id": 1,
//                "name": "Swarna Bharathi Institute of Science and Technology",
//                "about": "",
//                "establishment": "",
//                "institute_type": "",
//                "accreditted_by": "AICTE",
//                "affiliated_to": "Jawaharlal Nehru Technological University",
//                "rating": "",
//                "eligibility": "",
//                "admission_process": "",
//                "fees": "",
//                "visiting_companies": "",
//                "naac_rating": "",
//                "scholarship_and_finance": "",
//                "facilities": "",
//                "rank_index": "",
//                "avg_salary": "",
//                "faculty": "",
//                "placements": "",
//                "cutoffs": "",
//                "remarks": "",
//                "noted_alumni": "",
//                "other_details": "",
//                "phone": "(08742) 247777, 237777",
//                "email": "",
//                "website": "http://www.sbit.ac.in",
//                "fax": "(08742) 247788",
//                "full_address": "Pakabanda Bazar",
//                "city": "Khammam",
//                "state": "Andhra Pradesh",
//                "pin_code": "507002",
//                "country": "India"
//            }];

        // get call for items
        $scope.collegeInDetail = function () {
            // service call for selected item
//            $scope.selectedCollege = passDataBetweenCrtService.getCollegeFromService();
            $scope.selectedCollege = $routeParams.college_id;
            // api call for item in detail
            $http.get('/college/collegedetails?college_id=' + $scope.selectedCollege)
                    .then(function (response) {
                        if (response.status === 200) {
                            $scope.dataDetail = response.data.data;
                            dataDetailOld = JSON.parse(JSON.stringify($scope.dataDetail));
                        }
                    });
        };
        $scope.collegeInDetail();
        
        // back to previous page code
        $scope.back = function () {
            $window.history.back();
        };

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            item.editing = false;
            item.college_id = $scope.selectedCollege;
            var payload = {};
            payload = JSON.parse(JSON.stringify(item));
            delete payload.editing;
            delete payload.courses;
            //dong some background ajax calling for persistence...
            $http.put('/college/editCollege?college_id=' + $scope.selectedCollege, payload)
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


app.directive('whenScrolled', function () {
    return function (scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

app.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    };
});


app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (recruiter_name, file, uploadUrl) {
            data = [];
            data['name'] = recruiter_name;
            var fd = new FormData();
            fd.append('recruiter_name', recruiter_name);
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function () {
                // growl.addSuccessMessage("Recruiter Added successfully");
            }).error(function () {
                // growl.addErrorMessage("Recruiter not Added successfully");
            });
        };
    }]);
