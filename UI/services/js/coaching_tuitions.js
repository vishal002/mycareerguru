var app, angular;

app = angular.module('coaching', ['utilService', 'cgBusy', 'angular-svg-round-progressbar',
    'ui.tinymce']);

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


app.controller('coachingListCrt', ['$scope', '$http', 'passDataBetweenCrtService','$routeParams',
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
            } else {
                $http.get('/college/collegelist?request_type=FILTER&leval=' + sub_filter + '&majorfield_id=' + selectedMF + '&course_id=' + $scope.param_id)
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
        //$scope.getList();

        // dummy json
        $scope.dataList = [{"logo_img": "", "id":"001", "name": "Rajat Academy", "street": "pimpla saudagar",
                "city": "pune", "state": "maharashtra", "zip": "411017",
                "phone": "+91 9545902323", "mobile": "+91 9890663298", "fax": "", "email": "rajatacademy2005@gmail.com",
                "website": "http://www.rajatacademy.com/", "exam": ["8th", "9th", "10th"],
                "course": ["Medical Entrance", "Engineering Entrance", " IIT JEE Classes", " CET Classes", " IIT Foundation for 8th, 9th, 10th"],
                "class": ["8th", "9th", "10th"]}];

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

app.controller('coachingDetailCrt', ['$scope', '$http', 'passDataBetweenCrtService', 'fileUpload', '$routeParams',
    function ($scope, $http, passDataBetweenCrtService, fileUpload, $routeParams) {
        $scope.param_name = $routeParams.coaching_name;
        $scope.param_id = $routeParams.coaching_id;
        
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
        ];
        
        $scope.dataDetail = [{"logo_img": "", "id":"001", "name": "Rajat Academy", "street": "pimpla saudagar",
                "city": "pune", "state": "maharashtra", "zip": "411017",
                "phone": "+91 9545902323", "mobile": "+91 9890663298", "fax": "", "email": "rajatacademy2005@gmail.com",
                "website": "http://www.rajatacademy.com/", "exam": ["8th", "9th", "10th"],
                "course": ["Medical Entrance", "Engineering Entrance", " IIT JEE Classes", " CET Classes", " IIT Foundation for 8th, 9th, 10th"],
                "class": ["8th", "9th", "10th"]}];

        // get call for items
        $scope.collegeInDetail = function () {
            // service call for selected item
            $scope.selectedCollege = passDataBetweenCrtService.getCollegeFromService();
            // api call for item in detail
            $http.get('/college/collegedetails?college_id=' + $scope.selectedCollege)
                    .then(function (response) {
                        if (response.status === 200) {
                            $scope.dataDetail = response.data.data;
                            dataDetailOld = JSON.parse(JSON.stringify($scope.dataDetail));
                        }
                    });
        };
        //$scope.collegeInDetail();

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            item.editing = false;
            item.college_id = $scope.selectedCollege;
            //dong some background ajax calling for persistence...
            $http.put('/college/editCollege?college_id=' + $scope.selectedCollege, item)
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
