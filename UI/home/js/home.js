/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular, home;

home = angular.module('home', []);

home.controller('homeCrt', ['$scope', '$http', function ($scope, $http) {
        //
        $scope.loadSlider = function () {
            // JavaScript Document// REVOLUTION SLIDER  ============================================= //
            var tpj = jQuery;

            tpj(document).ready(function () {
                if (tpj.fn.cssOriginal != undefined)
                    tpj.fn.css = tpj.fn.cssOriginal;

                tpj('.fullwidthbanner').revolution(
                        {
                            delay: 9000,
                            startwidth: 960,
                            startheight: 400/*500*/,
                            onHoverStop: "on", // Stop Banner Timet at Hover on Slide on/off

                            thumbWidth: 100, // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
                            thumbHeight: 50,
                            thumbAmount: 3,
                            hideThumbs: 0,
                            navigationType: "none", // bullet, thumb, none
                            navigationArrows: "solo", // nexttobullets, solo (old name verticalcentered), none

                            navigationStyle: "square", // round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


                            navigationHAlign: "center", // Vertical Align top,center,bottom
                            navigationVAlign: "bottom", // Horizontal Align left,center,right
                            navigationHOffset: 30,
                            navigationVOffset: -40,
                            soloArrowLeftHalign: "left",
                            soloArrowLeftValign: "center",
                            soloArrowLeftHOffset: 0,
                            soloArrowLeftVOffset: 0,
                            soloArrowRightHalign: "right",
                            soloArrowRightValign: "center",
                            soloArrowRightHOffset: 0,
                            soloArrowRightVOffset: 0,
                            touchenabled: "on", // Enable Swipe Function : on/off


                            stopAtSlide: -1, // Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
                            stopAfterLoops: -1, // Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

                            hideCaptionAtLimit: 0, // It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
                            hideAllCaptionAtLilmit: 0, // Hide all The Captions if Width of Browser is less then this value
                            hideSliderAtLimit: 0, // Hide the whole slider, and stop also functions if Width of Browser is less than this value
                            fullWidth: "on",
                            shadow: 0	//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

                        });
            });
        };

        $scope.loadSections = function () {
            $scope.sections =
                    [
                        {"section_name": "Career Planning", "link": "#/services/career-planning/Career-Planning/1", "section_img": "icon icon-briefcase icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Qui cu eros feugiat"},
                        {"section_name": "College/ Course/ Career/ Exam", "link": "#/services/college-courses-exam-career-search", "section_img": "icon icon-search icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor "},
                        {"section_name": "Find Specialised Mentors", "link": "#/services/mentoring", "section_img": "icon icon-user icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Qui cu eros feugiat"},
                        {"section_name": "Aptitude/Ability Tests", "link": "#/services/aptitude-ability", "section_img": "icon icon-check icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Qui cu eros feugiat"},
                        {"section_name": "School Search", "link": "#/services/schools-list", "section_img": "icon icon-building icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Qui cu eros feugiat "},
                        {"section_name": "Coaching/ Tuitions Search", "link": "#/services/coaching-tuitions-list", "section_img": "icon icon-search icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet"},
                        {"section_name": "Planning to Study Abroad? ", "link": "#/services/study-abroad/after-12", "section_img": "icon icon-globe icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet"},
                        {"section_name": "Educational Scholarships", "link": "#/services/scholarships-list", "section_img": "icon icon-trophy icon-3x",
                            "description": "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet"}
                    ];
        };
        $scope.loadSections();

        $scope.latestUpdates = function () {
            $scope.latestUpdates = [{"title": "Exams updates", "desc": "BVP CET-Bharati Vidyapeeth Common Entrance Test 2017 on 12th March"},
                {"title": "Exam updates", "desc": "IPU CET-Guru Gobind Singh Indraprastha University Common Entrance Test on 15th April"},
                {"title": "Collage updates", "desc": "IPU CET-Guru Gobind Singh Indraprastha University Common Entrance Test on 15th April"}
            ];
        };
        $scope.latestUpdates();

        $scope.getTestimonialsList = function () {
            $scope.myPromise = $http.get('/testimonial/testimoniallist')
                    .then(function (respo) {
                        $scope.testimonialsList = respo.data.data;
                    });
        };
        $scope.getTestimonialsList();

        $scope.getIframeSrc = function (src) {
            return 'https://www.youtube.com/embed/' + src;
        };

    }]);

home.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
});



