var app, angular;

app = angular.module('study_abroad', ['utilService', 'cgBusy', 'angular-svg-round-progressbar',
    'ui.tinymce']);

app.controller('studyAbroadAfter12Ctrl', function ($scope, $http) {
    //
    $scope.getCountryDetails = function (id) {
        $http.get('/studyabroad/studyabroaddetails?study_abroad_id=' + id)
                .then(function (resp) {
                    if (resp.status === 200) {
                        $scope.dataDetail = resp.data.data;
                    } else {
                        console.log("error occured");
                    }
                });
    };

    // edit save cancel functionality
    $scope.editItem = function (item) {
        item.editing = true;
    };

    $scope.doneEditing = function (item) {
        // Commenting removing following field as per discussion with Rishikesh.
        delete item.editing;
        delete item.field_name;

        item.study_abroad_id = item.id;
        //dong some background ajax calling for persistence...
        $http.put('/studyabroad/editStudyAbroad', item)
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



    // get list of countries
    $http.get('/studyabroad/studyabroadlist')
            .then(function (response) {
                $scope.countryList = response.data.data;
                $scope.getCountryDetails($scope.countryList[0].id);
            });


    // for content editor
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
