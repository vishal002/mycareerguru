var app, angular;

app = angular.module('courses', ['utilService', 'cgBusy', 'angular-svg-round-progressbar',
    'ui.tinymce']);

app.controller('coursesMobileMenuCrt', function ($scope, $routeParams, $http) {
    $scope.listAfterX = [];
    $scope.listAfterXII = [];
    $scope.listAfterUGDegree = [];
    $scope.selectedMF = $routeParams.mf_id;

    $scope.myPromise = $http.get('/course/courselist?request_type=FILTER&majorfield_id=' + $routeParams.mf_id)
            .then(function (response) {
                $scope.listAfterX = response.data.data["After 10"];
                $scope.listAfterXII = response.data.data["After 12"];
                $scope.listAfterUGDegree = response.data.data["Post Graduation"];

                $scope.a_10 = 'After%10';
                $scope.a_12 = 'After%12';
                $scope.pg = 'Post%Graduation';

            });
});

app.controller('courseDetailCrt', ['$scope', '$http', 'fileUpload', '$routeParams',
    '$anchorScroll', '$location', 'growl',
    function ($scope, $http, fileUpload, $routeParams, $anchorScroll, $location, growl) {

        $scope.param_course_name = $routeParams.course_name;
        var param_course_id = $routeParams.course_id;

        // old data.
        var dataDetailOld;

        // menu json
        $scope.menu_list = [{"sub_id": "1", "sub_menu": "About / Overview"},
            {"sub_id": "2", "sub_menu": "Eligibility /Who can Join?"},
            {"sub_id": "3", "sub_menu": "Course Type"}, {"sub_id": "4", "sub_menu": "Course Duration"},
            {"sub_id": "5", "sub_menu": "Syllabus"}, {"sub_id": "6", "sub_menu": "Description"},
            {"sub_id": "7", "sub_menu": "Level"}, {"sub_id": "8", "sub_menu": "Visiting companies"},
            {"sub_id": "9", "sub_menu": "Related course"}, {"sub_id": "10", "sub_menu": "Advance Course"},
            {"sub_id": "11", "sub_menu": "Suitability"}, {"sub_id": "12", "sub_menu": "Beneficial"},
            {"sub_id": "13", "sub_menu": "Employment Areas"}, {"sub_id": "14", "sub_menu": "Job Types"},
            {"sub_id": "15", "sub_menu": "Careers"}, {"sub_id": "16", "sub_menu": "Other Details"}
        ];

        // get call for items
        $scope.courseInDetail = function () {
            // api call for item in detail
            $scope.myPromise = $http.get('/course/coursedetails?course_id=' + param_course_id)
                    .then(function (response) {
                        if (response.status === 200) {
                            $scope.dataDetail = response.data.data;
                            dataDetailOld = JSON.parse(JSON.stringify($scope.dataDetail));
                        }
                    });
        };
        $scope.courseInDetail();

        //
        $scope.gotoAnchor = function (x) {
            var newHash = x;
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash(x);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }

        };

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            item.editing = false;
            item.course_id = item.id;
            delete item.editing;
            //dong some background ajax calling for persistence...
            $http.put('/course/editCourse', item)
                    .success(function (data, status, headers, config) {
                        growl.success("Data updates successfully");
                    })
                    .error(function (data, status, header, config) {
                        growl.error("Some error occured try again later");
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

app.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    };
});
