/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('career_planning', ['ngWYSIWYG']);

cp.controller('careerPlanningCrt', ['$scope', 'allMenuService', '$http', '$log', 'majorFieldsService',
    '$routeParams',
    function ($scope, allMenuService, $http, $log, majorFieldsService, $routeParams) {
        // side menu
        $scope.getSideMenu = function () {
            //
            $http.get('/careeroption/planninglist')
                    .then(function (response) {
                        $scope.sideMenu = response.data.data;
                    });
        };
        $scope.getSideMenu();

        // Explore Different Careers
        $scope.getMajorFields = function () {
            //
            var promise = majorFieldsService.getMajorfieldsList();
            promise.then(function (response) {
                if (response.status === 200) {
                    $scope.majorFieldsList = response.data.data;
                } else {
                    console.log(response.statusText);
                }
            });
        };
        $scope.getMajorFields();

        // explore diffrent carrer search option list called during loading of the options
        $http.get('/careeroption/careeroptionlist?request_type=FILTER_OPTIONS')
                .then(function (response) {
                    $scope.searchOptions = response.data.data;
                });

        // get Career List 
        $scope.getCareerList = function (request_type, field, value) {
            if (request_type) {
                $http.get('/careeroption/careeroptionlist?request_type=' + request_type + '&field=' + field + '&value=' + value)
                        .then(function (response) {
                            if (response.status === 200) {
                                $scope.careerList = response.data.data;
                            } else {
                                console.log(response.statusText);
                            }
                        });
            } else {
                $http.get('/careeroption/careeroptionlist')
                        .then(function (response) {
                            if (response.status === 200) {
                                $scope.careerList = response.data.data;
                            } else {
                                console.log(response.statusText);
                            }
                        });
            }
        };
        $scope.getCareerList();





        // logic for current selected
        $scope.currentSelected = $routeParams.id;
        $scope.param_name = $routeParams.career_planning_name;

        //
        $scope.getMenuContent = function (sub_id, index) {
            // api call to fetch content of selected menu
            $http.get('/careeroption/planningdetails?career_planning_id=' + $routeParams.id)
                    .then(function (response) {
                        $scope.dataDetail = response.data.data;
                    });
        };
        $scope.getMenuContent();


        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            // Commenting removing following field as per discussion with Rishikesh.
            delete item.editing;
            delete item.field_name;

            item.career_planning_id = item.id;
            //dong some background ajax calling for persistence...
            $http.put('/careeroption/editCareerPlanning', item)
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







        //
        // set the value of question number to 1
        $scope.limit = 0;
        // fetch the data for test
        $scope.startTest = function () {
            $http.get('/static/api/test.json')
                    .then(function (response) {
                        $scope.questionList = response.data;
                    });
        };
        $scope.startTest();
        // get next question
        $scope.next = function (val) {
            if (val + 1 < (Object.keys($scope.questionList).length)) {
                $scope.limit = $scope.limit + 1;
            }
        };
        // get previous question
        $scope.previous = function (val) {
            if (val != 0) {
                $scope.limit = $scope.limit - 1;
            }
        };
        // change the opeion latters to alphabet
        $scope.letter = function (i) {
            return String.fromCharCode(65 + i);
        };
        // to find the duplacate from array
        function find_duplicates(arr) {
            var len = arr.length,
                    out = [],
                    counts = {};

            for (var i = 0; i < len; i++) {
                var item = arr[i];
                counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
                if (counts[item] === 2) {
                    out.push(item);
                }
            }

            return Object.keys(counts).length
        }
        // list of correct answers 
        $scope.answerArr = [];
        // submit the test
        $scope.submitTest = function () {
            find_duplicates($scope.answerArr);
            debugger;
        };
        // select the options
        $scope.selectOption = function (param1, param2) {
            for (var i = 0; i < $scope.questionList.length; i++) {
                if ($scope.questionList[i].question_id == param2) {
                    for (var j = 0; j < $scope.questionList[i].options.length; j++) {
                        if ($scope.questionList[i].options[j] == param1 && $scope.questionList[i].correct == param1) {
                            $scope.answerArr.push(param2);
                        }
                    }
                }
            }
        };
        // set timer 
        $scope.countdown = function (elementName, minutes, seconds) {
            var element, endTime, hours, mins, msLeft, time;
            function twoDigits(n)
            {
                return (n <= 9 ? "0" + n : n);
            }

            function updateTimer()
            {
                msLeft = endTime - (+new Date);
                if (msLeft < 1000) {
                    element.innerHTML = "countdown's over!";
                } else {
                    time = new Date(msLeft);
                    hours = time.getUTCHours();
                    mins = time.getUTCMinutes();
                    element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
                    setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
                }
            }

            element = document.getElementById(elementName);
            endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
            updateTimer();
        };

    }]);

cp.controller('exploreDiffCareerPlanningCrt', ['$scope', 'allMenuService', '$http',
    '$log', 'majorFieldsService', '$routeParams', 'growl',
    function ($scope, allMenuService, $http, $log, majorFieldsService, $routeParams, growl) {
        // side menu
        // Explore Different Careers
        $scope.getMajorFields = function () {
            //
            var promise = majorFieldsService.getMajorfieldsList();
            promise.then(function (response) {
                if (response.status === 200) {
                    $scope.majorFieldsList = response.data.data;
                } else {
                    console.log(response.statusText);
                }
            });
        };
        $scope.getMajorFields();

        // bread crum name for the carrer selected
        $scope.param_name = $routeParams.name;

        // 
        $scope.getCareerDetails = function (sub_id, index) {
            // logic for current selected
            $scope.currentSelected = index;

            $http.get('/careeroption/careeroptiondetails?career_option_id=' + $routeParams.id)
                    .then(function (response) {
                        $scope.dataDetail = response.data.data;
                    });
        };
        $scope.getCareerDetails();

        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            // Commenting removing following field as per discussion with Rishikesh.
            delete item.editing;
            delete item.field_name;

            item.career_option_id = item.id;
            //dong some background ajax calling for persistence...
            $http.put('/careeroption/editCareerOption', item)
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


    }]);


