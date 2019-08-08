/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular, app;

app = angular.module('mcgApp', ['ngRoute', 'utilService', 'section', 'home',
    'career_planning', 'courses_&_colleges', 'Authentication', 'ngCookies',
    'AuthenticationSer', 'exam', 'angularUtils.directives.dirPagination', 'cgBusy',
    'angular-svg-round-progressbar', 'ui.tinymce', 'school', 'study_abroad', 'autoComplete',
    'pro_mentoring', 'scholarships', 'aptitude_ability', 'registerUserApp', 'mentoring',
    'mentee', 'mentor', 'colleges', 'courses', 'exams', 'col_cou_ex_car_search',
    'home_schooling', 'knowledge_society', 'home_schooling_decoded', 'student_dashboard',
    'coaching', 'angular-growl']);

app.config(['growlProvider', function (growlProvider) {
        growlProvider.globalTimeToLive(4000);
    }]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: '/static/home/view/home.html'
        }).when('/login', {
            templateUrl: '/static/login/view/login.html'
        }).when('/dashboard', {
            templateUrl: '/static/login/view/student-dashboard.html'
        }).when('/register', {
            templateUrl: '/static/login/view/register.html'
        })
                // about us
                .when('/donation', {
                    templateUrl: '/static/sections/view/donation.html'
                })
                // about us
                .when('/about-us', {
                    templateUrl: '/static/sections/view/about_us.html'
                })
                // all menu
                .when('/all-menu/:selectedMenu', {
                    templateUrl: '/static/sections/view/view_all_subjects.html'
                })

                // coaching-tuitions
                .when('/services/coaching-tuitions-list', {
                    templateUrl: '/static/services/view/coaching-tuitions/coaching_tuitions_list.html'
                })
                .when('/services/coaching-tuitions-list/:coaching_name/:coaching_id', {
                    templateUrl: '/static/services/view/coaching-tuitions/coaching_tuitions.html'
                })


                // home-schooling
                .when('/services/home-schooling', {
                    templateUrl: '/static/services/view/home-schooling/home-schooling-list.html'
                })

                // Knowledge Society
                .when('/services/knowledge-society', {
                    templateUrl: '/static/services/view/knowledge-society/knowledge-society-list.html'
                })

                // Home Schooling Decoded
                .when('/services/home-schooling-decoded', {
                    templateUrl: '/static/services/view/home-schooling-decoded/home-schooling-decoded-list.html'
                })


                // carrier planning explore difftent carreres
                .when('/services/career-planning/explore-different-careers/:name/:id', {
                    templateUrl: '/static/services/view/career-planning/explore_different_careers.html'
                })

                .when('/services/career-planning/:career_planning_name/:id', {
                    templateUrl: '/static/services/view/career-planning/career_planning.html'
                })
                .when('/services/career-planning/online-test', {
                    templateUrl: '/static/services/view/career-planning/test.html'
                })

                // College, Courses, Exam and Careers Search
                .when('/services/college-courses-exam-career-search', {
                    templateUrl: '/static/services/view/col_cou_ex_car-search/col_cou_ex_car-search_list.html'
                })

                // scholarships
                .when('/services/scholarships-list', {
                    templateUrl: '/static/services/view/scholarships/scholarships_list.html'
                })
                .when('/services/scholarships-list/scholarships/:scholarships_name/:id', {
                    templateUrl: '/static/services/view/scholarships/scholarships.html'
                })

                // professional-mentoring
                .when('/services/professional-mentoring-list', {
                    templateUrl: '/static/services/view/pro-mentoring/mentor_list.html'
                })

                // college
                .when('/services/colleges/colleges-list/:course_id/:course_name/:sub_filter/:selectedMF', {
                    templateUrl: '/static/services/view/colleges/college_list.html'
                })
                .when('/services/colleges/colleges-list/:search_name', {
                    templateUrl: '/static/services/view/colleges/college_list.html'
                })
                .when('/services/colleges/:college_name/:college_id', {
                    templateUrl: '/static/services/view/colleges/colleges.html'
                })

                // college route for mobile
                .when('/services/colleges/major-fields/:mf_id', {
                    templateUrl: '/static/services/view/colleges/mo_colleges_menu.html'
                })

                // courses
                .when('/services/courses/:course_name/:course_id', {
                    templateUrl: '/static/services/view/courses/courses.html'
                })

                // courses route for mobile
                .when('/services/courses/major-fields/via/:mf_id', {
                    templateUrl: '/static/services/view/courses/mo_courses_menu.html'
                })

                // courses-&-colleges
                // route for web and tablets
//                .when('/services/courses-&-colleges', {
//                    templateUrl: '/static/services/view/courses-&-colleges/courses-&-colleges.html'
//                })
//                .when('/services/courses-&-colleges/courses', {
//                    templateUrl: '/static/services/view/courses-&-colleges/courses.html'
//                })
//                .when('/services/courses-&-colleges/colleges/:college_name', {
//                    templateUrl: '/static/services/view/courses-&-colleges/colleges.html'
//                })
//                .when('/services/courses-&-colleges/colleges/:college_name', {
//                    templateUrl: '/static/services/view/courses-&-colleges/colleges.html'
//                })
//                .when('/services/courses-&-colleges/colleges-list', {
//                    templateUrl: '/static/services/view/courses-&-colleges/college_list.html'
//                })

                // route for mobile
//                .when('/services/courses-&-colleges/major-fields', {
//                    templateUrl: '/static/services/view/courses-&-colleges/mobile/mo_courses-&-colleges_menu.html'
//                })

                // entrance_and_scholarship_exams_list
                .when('/services/entrance_and_scholarship_exams_list/exam/:exam_name', {
                    templateUrl: '/static/services/view/exams/exam.html'
                })
                .when('/services/entrance_and_scholarship_exams_list/', {
                    templateUrl: '/static/services/view/exams/exam_list.html'
                })
                .when('/services/entrance_and_scholarship_exams_list/:exam_name', {
                    templateUrl: '/static/services/view/exams/exam_list.html'
                })

                // entrance_and_scholarship_exams_list route for mobile
                .when('/services/entrance_and_scholarship_exams_list/major-fields/:mf_id', {
                    templateUrl: '/static/services/view/exams/mo_exam_menu.html'
                })




//                // route for mobile
//                .when('/services/entrance_and_scholarship_exams_list/major-fields', {
//                    templateUrl: '/static/services/view/exams/mobile/mo_entrance_and_scholarship_exams.html'
//                })

                // schools-list
                .when('/services/schools-list/:school_id/:school_name', {
                    templateUrl: '/static/services/view/schools/school.html'
                })
                .when('/services/schools-list', {
                    templateUrl: '/static/services/view/schools/school_list.html'
                })

                // study-abroad
                .when('/services/study-abroad/after-12', {
                    templateUrl: '/static/services/view/study_abroad/study_after_12.html'
                })
                .when('/services/study-abroad/after-ug', {
                    templateUrl: '/static/services/view/study_abroad/study_after_ug.html'
                })


                .when('/admin', {
                    templateUrl: '/static/admin/view/login.html'
                })
                .when('/shop/:categoryId/:itemTypeId', {
                    templateUrl: '/static/templates/shop/view/shop.html'
                })
                .when('/shop/:itemTypeId', {
                    templateUrl: '/static/templates/shop/view/shop.html'
                })
                .when('/admin/create-test', {
                    templateUrl: '/static/services/view/aptitude-ability/create-test.html'
                })

                .when('/services/aptitude-ability', {
                    templateUrl: '/static/services/view/aptitude-ability/aptitude_ability.html'
                })
                .when('/services/aptitude-ability/:sub_id', {
                    templateUrl: '/static/services/view/aptitude-ability/aptitude_ability.html'
                })
                .when('/services/aptitude-ability/online-test/:sub_id', {
                    templateUrl: '/static/services/view/aptitude-ability/test.html'
                })
                .when('/services/aptitude-ability/online-test/:sub_id/:test_id', {
                    templateUrl: '/static/services/view/aptitude-ability/aptitude_ability/test.html'
                })
                .when('/services/mentoring', {
                    templateUrl: '/static/services/view/mentoring/mentoring.html'
                }).when('/services/mentee', {
            templateUrl: '/static/services/view/mentoring/mentee.html'
        }).when('/services/mentor', {
            templateUrl: '/static/services/view/mentoring/mentor.html'
        }).when('/services/exams/exam_list', {
            templateUrl: '/static/services/view/exams/exam_list.html'
        }).when('/services/exams/exams/:exam_id/:exam_name', {
            templateUrl: '/static/services/view/exams/exams.html'
        }).otherwise({
            redirectTo: '/home'
        });
    }]);

//app.run(['$anchorScroll', function($anchorScroll) {
//        $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
//    }]);
app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in
//            if ($location.path() !== '/dashboard' && !$rootScope.globals.currentUser) {
//                $location.path('/login');
//            }
//        });
    }]);



