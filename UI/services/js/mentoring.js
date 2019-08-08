/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('mentoring', ['ngWYSIWYG', 'ngRoute']);

cp.controller('MentoringController', ['$scope', 'allMenuService', '$http', '$log', 'mentoringLeftSectionService', '$routeParams',
    function ($scope, allMenuService, $http, $log, mentoringLeftSectionService, $routeParams) {
        // side menu
        $scope.getSideMenu = function () {
            $http.get('/mentoring/mentoringlist')
                    .then(function (response) {
                        if (response.status === 200) {
                            $scope.sideMenu = response.data.data;
                        } else {
                            console.log(response.statusText);
                        }
                    });
        };
        $scope.getSideMenu();

        //
        $scope.getMenuContent = function (id) {
            // logic for current selected
            $scope.currentSelected = id;

            // api call to fetch content of selected menu
            $http.get('/mentoring/mentoringdetails?mentoring_id=' + id)
                    .then(function (response) {
                        $scope.dataDetail = response.data.data;
                    });
        };
        // Load MenuContent based on sub_id else load default.
        if ($routeParams.id != undefined)
            $scope.getMenuContent($routeParams.id);
        else
            $scope.getMenuContent(4);       // Default id to be passed. 


        // edit save cancel functionality
        $scope.editItem = function (item) {
            item.editing = true;
        };

        $scope.doneEditing = function (item) {
            // Commenting removing following field as per discussion with Rishikesh.
            delete item.editing;
            delete item.field_name;

            item.mentoring_id = item.id;
            //dong some background ajax calling for persistence...
            $http.put('/mentoring/editMentoring', item)
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

        // set the value of question number to 1
        $scope.limit = 0;
        // fetch the data for test
        $scope.startTest = function () {
            $http.get('/static/api/test.json?sub_id=' + $routeParams.sub_id + '&test_id=' + $routeParams.test_id)
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




