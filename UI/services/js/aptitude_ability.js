/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('aptitude_ability', ['ngWYSIWYG', 'ngRoute', 'ngSanitize','ui.tinymce']);

cp.controller('aptitudeAbilityCrt', ['$scope', 'allMenuService', '$http', '$log', 'aptitudeAbilityTestsleftSectionService', '$routeParams',
    function ($scope, allMenuService, $http, $log, aptitudeAbilityTestsleftSectionService, $routeParams) {
        // side menu
        $scope.getSideMenu = function () {
            //
            var promise = aptitudeAbilityTestsleftSectionService.getMenuList();
            promise.then(function (response) {
                if (response.status === 200) {
                    $scope.sideMenu = response.data
                } else {
                    console.log(response.statusText);
                }
            });
        };
        $scope.getSideMenu();

        //
        $scope.getMenuContent = function (sub_id, index) {
            // logic for current selected
            $scope.currentSelected = sub_id;

            // api call to fetch content of selected menu
            $http.get('/static/api/aptitudeAbilityTestsContent.json?menu_id=' + sub_id)
                    .then(function (response) {
                        $scope.content = response.data[sub_id];
                        console.log($scope.content.sub_menu);
                    });
        };
        // Load MenuContent based on sub_id else load default.
        if ($routeParams.sub_id != undefined)
            $scope.getMenuContent($routeParams.sub_id);
        else
            $scope.getMenuContent(0, 0);


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

cp.controller('AptitudeCreateTestController', ['$scope', 'allMenuService', '$http', '$log', 'aptitudeCreateTestLeftSectionService', '$routeParams',
    function ($scope, allMenuService, $http, $log, aptitudeCreateTestLeftSectionService, $routeParams) {

        $scope.create = {};
        $scope.createdTestArray = [];
        $scope.isEdit = false;

        // For test type dummy data remove after integration.
//        $scope.test_type_array = [
//            {"id": 0, "name": "TEST 1"},
//            {"id": 1, "name": "TEST 2"},
//            {"id": 2, "name": "TEST 3"}
//        ];

        $scope.test_type_array = [{
                "id": "", "test_type": "", "test_description": "", "test_instruction": ""
            }];
        $scope.sub_test_type_array = [{
                "id": "", "test_type": "", "sub_test_type": "", "total_marks": "",
                "total_time": "", "total_questions": ""
            }];
        $scope.questions = [{
                "id": "", "test_type": "", "sub_test_type": "", "test_question": "",
                "test_option_a": "", "test_option_b": "", "test_option_c": "",
                "test_option_d": "", "test_option_e": "", "marks": "", "selectedCorrectOption": ""
            }];

        $scope.getAllTestType = function () {
            $http.get('/test/testtypedetails?request_type=ALL').then(function (response) {
                $scope.test_type_array = response.data.data;
            });
        };
        $scope.getAllTestType();

        $scope.getAllSubTestType = function () {
            $http.get('/test/testsubtypedetails?request_type=ALL').then(function (response) {
                $scope.sub_test_type_array = response.data.data;
            });
        };
        $scope.getAllSubTestType();

        $scope.correctOptions = [
            {"id": 0, "name": "Option A"},
            {"id": 1, "name": "Option B"},
            {"id": 2, "name": "Option C"},
            {"id": 3, "name": "Option D"},
            {"id": 4, "name": "Option E"}
        ]

        // side menu
        $scope.getSideMenu = function () {
            //
            var promise = aptitudeCreateTestLeftSectionService.getMenuList();
            promise.then(function (response) {
                if (response.status === 200) {
                    $scope.sideMenu = response.data
                } else {
                    console.log(response.statusText);
                }
            });
        };
        $scope.getSideMenu();

        //
        $scope.getMenuContent = function (sub_id, index) {
            // logic for current selected
            $scope.currentSelected = sub_id;

            // api call to fetch content of selected menu
            $http.get('/static/api/aptitudeCreateTestContent.json')
                    .then(function (response) {
                        $scope.content = response.data[index];
                        $scope.getCreatedTest($scope.content.sub_id);
                    });
        };
        // Load MenuContent based on sub_id else load default.
        if ($routeParams.sub_id != undefined)
            $scope.getMenuContent($routeParams.sub_id);
        else
            $scope.getMenuContent(0, 0);


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


        $scope.createTest = function (index, param_type) {
            console.log('is Edit:' +$scope.isEdit);
            if ($scope.isEdit) {
                $scope.saveEditTest(index, param_type);
            } else {
                if (param_type === 'TEST_TYPE') {
                    $http.post('/test/addTestType', $scope.create)
                            .success(function () {
                                console.log("test type created");
                            })
                            .error(function () {
                                console.log("test type error occured");
                            });
                }
                if (param_type === 'SUB_TEST_TYPE') {
                    var payload = JSON.parse(JSON.stringify($scope.create));
                    payload.test_type_id = $scope.create.selected_test_type;
                    delete payload.test_type;
                    delete payload.selected_test_type;

                    $http.post('/test/addTestSubType', payload)
                            .success(function () {
                                console.log("sub test type created");
                            })
                            .error(function () {
                                console.log("sub test type error occured");
                            });
                }
                if (param_type === 'QUESTION') {
                    var payload = JSON.parse(JSON.stringify($scope.create));
                    payload.sub_test_type_id = $scope.create.selected_sub_test_type;
                    payload.image = "";
                    delete payload.test_type;
                    delete payload.selected_test_type;
                    delete payload.sub_test_type;
                    delete payload.selected_sub_test_type;
                    delete payload.selected_correctOption;
                    delete payload.correctOptionName;
                    console.log(payload);
                    $http.post('/test/addQuestion', payload)
                            .success(function () {
                                console.log("Question created");
                            })
                            .error(function () {
                                console.log("Question error occured");
                            });
                }


                $scope.createdTestArray.push($scope.create);
                $scope.create = {};
            }
        };

        // Wrapper to createTest function for Sub-test type.
        $scope.createSubTest = function (index, param_type) {
            var
                    test_type_filtered;

            if($scope.isEdit) 
                test_type_filtered = $scope.getSelectedItem($scope.test_type_array, $scope.create.test_type_id);
            else
                test_type_filtered = $scope.getSelectedItem($scope.test_type_array, $scope.create.selected_test_type);

            $scope.create.test_type = test_type_filtered.test_type;
            $scope.create.selected_test_type = test_type_filtered.id;

            $scope.createTest(index, param_type);
        };

        // Wrapper to createTest function for Question.
        $scope.createQuestion = function (index, param_type) {
            var
                    test_type_filtered,
                    sub_test_type_filtered,
                    correctOption_filtered;

            if($scope.isEdit){
                test_type_filtered = $scope.getSelectedItem($scope.test_type_array, $scope.create.test_type_id);
                sub_test_type_filtered = $scope.getSelectedItem($scope.sub_test_type_array, $scope.create.test_sub_type_id);
                correctOption_filtered = $scope.getSelectedItem($scope.correctOptions, $scope.create.selectedCorrectOption);
            } else {
                test_type_filtered = $scope.getSelectedItem($scope.test_type_array, $scope.create.selected_test_type);
                sub_test_type_filtered = $scope.getSelectedItem($scope.sub_test_type_array, $scope.create.selected_sub_test_type);
                correctOption_filtered = $scope.getSelectedItem($scope.correctOptions, $scope.create.selectedCorrectOption);
            }

            $scope.create.test_type = test_type_filtered.test_type;
            $scope.create.selected_test_type = test_type_filtered.id;

            $scope.create.sub_test_type = sub_test_type_filtered.sub_test_type;
            $scope.create.selected_sub_test_type = sub_test_type_filtered.id;

            $scope.create.correctOptionName = correctOption_filtered.name;
            $scope.create.selected_correctOption = correctOption_filtered.id;
            $scope.createTest(index, param_type);
        }

        $scope.getSelectedItem = function (arr, id) {
            var returnArr = arr.filter(function (item) {
                return item.id == id;
            });

            return returnArr[0];
        };

        $scope.clearTest = function () {
            $scope.create = {};
            $scope.isEdit = false;
        };

        $scope.getCreatedTest = function (sub_id) {
            $scope.createdTestArray = [];
            $scope.create = {};

            if(sub_id == 3) {
                // For Question type
                $scope.getAllTestType();
                $scope.getAllSubTestType();
                $http.get('/test/questiondetails?request_type=ALL')
                    .then(function (response) {
                        $scope.createdTestArray = response.data.data;
                    });
            } else if(sub_id == 2) {
                // For Sub test type
                $scope.getAllTestType();
                $http.get('/test/testsubtypedetails?request_type=ALL')
                    .then(function (response) {
                        $scope.createdTestArray = response.data.data;
                    });
            } else {
                // For Test type
                $http.get('/test/testtypedetails?request_type=ALL')
                    .then(function (response) {
                        $scope.createdTestArray = response.data.data;
                    });
            }
        };

        $scope.deleteTest = function (test_id, index, param_type) {
            var payload = {};
            if (param_type === 'TEST_TYPE') {
                payload = {'test_type_id':test_id};
                $http.delete('/test/deleteTestType', payload)
                        .success(function () {
                            console.log("test type delete");
                        })
                        .error(function () {
                            console.log("test type error occured");
                        });
            }
            if (param_type === 'SUB_TEST_TYPE') {
                payload.test_sub_type_id = test_id;
                $http.delete('/test/deleteTestSubType', payload)
                        .success(function () {
                            console.log("sub test type delete");
                        })
                        .error(function () {
                            console.log("sub test type error occured");
                        });
            }
            if (param_type === 'QUESTION') {
                $http.delete('/test/deleteQuestion', test_id)
                        .success(function () {
                            console.log("test type delete");
                        })
                        .error(function () {
                            console.log("test type error occured");
                        });
            }

            // Remove only on success. so remove this code after integration.   
            $scope.createdTestArray.splice(index, 1);
        };

        $scope.editTest = function (test_id, index) {
            $scope.create = {};
            $scope.create = $scope.createdTestArray[index];
            $scope.isEdit = true;
        };

        $scope.saveEditTest = function (index, param_type) {
            $scope.createdTestArray.splice(index, 1, $scope.create);

            if (param_type === 'TEST_TYPE') {
                $scope.create.test_type_id = $scope.create.id;
                $http.put('/test/editTestType', $scope.create)
                        .success(function () {
                            console.log("test type edit");
                        })
                        .error(function () {
                            console.log("test type error occured");
                        });
            }
            if (param_type === 'SUB_TEST_TYPE') {
                var payload = JSON.parse(JSON.stringify($scope.create));
                if($scope.isEdit) 
                    payload.test_type_id = $scope.create.test_type_id;
                else
                    payload.test_type_id = $scope.create.selected_test_type;
                payload.test_sub_type_id = $scope.create.id;
                delete payload.test_type;
                delete payload.selected_test_type;
                $http.put('/test/editTestSubType', payload)
                        .success(function () {
                            console.log("sub test type edit");
                        })
                        .error(function () {
                            console.log("sub test type error occured");
                        });
            }
            if (param_type === 'QUESTION') {
                var payload = JSON.parse(JSON.stringify($scope.create));
                if($scope.isEdit) {
                    payload.sub_test_type_id = $scope.create.test_sub_type_id;
                }else{
                    payload.sub_test_type_id = $scope.create.selected_sub_test_type;
                }
                payload.image = "";
                delete payload.test_type;
                delete payload.test_type_id;
                delete payload.selected_test_type;
                delete payload.sub_test_type;
                delete payload.selected_sub_test_type;
                delete payload.selected_correctOption;
                delete payload.correctOptionName;
                delete payload.test_sub_type_id;
                $http.put('/test/editQuestion', payload)
                        .success(function () {
                            console.log("test type edit");
                        })
                        .error(function () {
                            console.log("test type error occured");
                        });
            }

            $scope.create = {};
            $scope.isEdit = false;
        };

        $scope.subTestTypeFilter = function (type) {
            if (type.test_type_id == $scope.create.selected_test_type ||
                type.test_type_id == $scope.create.test_type_id )
                return true;
            else
                $scope.selected_sub_test_type = "";
        }

        $scope.tinymceOptions = {
            plugins: ['advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: '//www.tinymce.com/css/codepen.min.css'
        };
    }]);



