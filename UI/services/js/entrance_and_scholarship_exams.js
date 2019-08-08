/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('exam', ['ngWYSIWYG', 'utilService']);

cp.controller('examListCrt', ['$scope', 'allMenuService', '$http', '$log', 'passDataBetweenCrt2Service',
    function ($scope, allMenuService, $http, $log, passDataBetweenCrt2Service) {

        //
        $scope.getExamList = function () {
            $scope.examList = [{"logo": "https://www.collegesearch.in/upload/exam/121116042528_jee.jpg",
                    "titel": "JEE Main", "name": "Joint Entrance Exam Main", "exam_date": "09-Apr-2017 to 15-Apr-2017"},
                {"logo": "https://www.collegesearch.in/upload/exam/130813024933_KEA_logo.jpg",
                    "titel": "Karnataka PGCET", "name": "Post Graduate Common Entrance Test ", "exam_date": "25-May-2017"},
                {"logo": "https://www.collegesearch.in/upload/exam/131209042925_ipu.PNG",
                    "titel": "GGSIPU CET", "name": "Guru Gobind Singh Indraprastha University Common CET", "exam_date": "25-May-2017"},
                {"logo": "https://www.collegesearch.in/upload/exam/130813024933_KEA_logo.jpg",
                    "titel": "Karnataka PGCET", "name": "Post Graduate Common Entrance Test ", "exam_date": "25-May-2017"},
                {"logo": "https://www.collegesearch.in/upload/exam/130813024933_KEA_logo.jpg",
                    "titel": "Karnataka PGCET", "name": "Post Graduate Common Entrance Test ", "exam_date": "25-May-2017"}
            ];
        };
        $scope.getExamList();

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
        //vm.getData(vm.pageno); // Call the function to fetch initial data on page load.

        // get collage in detail function
        $scope.setExamInDetail = function (param) {
            passDataBetweenCrt2Service.setExamInService(param);
        };

    }]);

cp.controller('examDetailCrt', ['$scope', '$http', 'passDataBetweenCrt2Service', '$location', '$anchorScroll',
    function ($scope, $http, passDataBetweenCrt2Service, $location, $anchorScroll) {
        //
        $scope.examInDetail = function () {
            $scope.selectedExam = passDataBetweenCrt2Service.getExamFromService();
            var examDetaFromApi;
            $http.get('/static/api/examInDetail.json')
                    .then(function (resp) {
                        if (resp.status === 200) {
                            examDetaFromApi = resp.data;
                            $scope.selectedExamabout = examDetaFromApi[0].about;
                            $scope.selectedExamlatest_developement = examDetaFromApi[0].latest_developement;
                            $scope.selectedExamprevious_years_question_papers = examDetaFromApi[0].previous_years_question_papers;
                            $scope.selectedExamnotification = examDetaFromApi[0].notification;
                            $scope.selectedExamimportant_dates = examDetaFromApi[0].important_dates;
                            $scope.selectedExameligibility = examDetaFromApi[0].eligibility;
                            $scope.selectedExamapplication_procedure = examDetaFromApi[0].application_procedure;
                            $scope.selectedExamapplication_fee = examDetaFromApi[0].application_fee;
                            $scope.selectedExamsyllabus = examDetaFromApi[0].syllabus;
                            $scope.selectedExamexam_pattern = examDetaFromApi[0].exam_pattern;
                            $scope.selectedExampreparation_tips = examDetaFromApi[0].preparation_tips;
                            $scope.selectedExamstudy_material = examDetaFromApi[0].study_material;
                            $scope.selectedExamanswer_keys = examDetaFromApi[0].answer_keys;
                            $scope.selectedExamadmin_card = examDetaFromApi[0].admin_card;
                            $scope.selectedExamexam_toppers = examDetaFromApi[0].exam_toppers;
                            $scope.selectedExamexam_centers = examDetaFromApi[0].exam_centers;
                            $scope.selectedExamsubject_experts = examDetaFromApi[0].subject_experts;
                            $scope.selectedExamexam_results = examDetaFromApi[0].exam_results;
                            $scope.selectedExamexam_cut_Offs = examDetaFromApi[0].exam_cut_Offs;
                            $scope.selectedExampreparation_videos = examDetaFromApi[0].preparation_videos;
                            $scope.selectedExamdocuments_to_be_carried = examDetaFromApi[0].documents_to_be_carried;
                            $scope.selectedExamacknowledgement_of_form = examDetaFromApi[0].acknowledgement_of_form;
                            $scope.selectedExamscore_evaluation = examDetaFromApi[0].score_evaluation;
                            $scope.selectedExamtop_colleges = examDetaFromApi[0].top_colleges;
                            $scope.selectedExamLatestfaqs = examDetaFromApi[0].faqs;
                            
                            
                        } else {
                            console.log("error occured");
                        }
                    });
        };
        $scope.examInDetail();

        $scope.scrollTo = function (id) {
            $location.hash(id);
            console.log($location.hash());
            $anchorScroll();
        };

    }]);

