var app, angular;

app = angular.module('courses_&_colleges', ['utilService', 'cgBusy', 'angular-svg-round-progressbar',
    'ui.tinymce']);

app.controller('mobileMenuCrt', function ($scope) {
    $scope.listAfterX = ["Diploma in Automobile Engineering", "Diploma in Chemical Engineering", "Diploma in Civil Engineering", "Diploma in Computer Engineering",
        "Diploma in Computer Science and Engineering"];
    $scope.listAfterXII = ["B Tech In Computer Science and Engineering", "B Tech In Information Technology", "B Tech Aerospace Engineering",
        "B Tech Automobile Engineering", "B Arch- Bachelor in Architecture", "B Tech- Mechanical Engineering"];
    $scope.listAfterUGDegree = ["M Tech In Computer Science and Engineering", "M Tech In Information Technology", "M Tech Aerospace Engineering",
        "M Tech Automobile Engineering", "M Arch- Bachelor in Architecture", "M Tech- Mechanical Engineering"];
});

app.controller('coursesCtrl_old', function ($scope) {
    $scope.items2 = [{"img_path": "https://www.collegesearch.in/upload/institute/images/large/150211083948_IIT_Kharagpur_Main_Building.jpg",
            "name": "Indian Institute of Technology - Kanpur (IIT Kanpur)", "link": ""},
        {"img_path": "https://www.collegesearch.in/upload/institute/images/large/150211084357_IIT_Bombay.jpg",
            "name": "Indian Institute of Technology - Bombay (IIT Bombay )", "link": ""}];
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


app.controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
    function ($anchorScroll, $location, $scope) {

        var elemPosition = $('.fixed-header').offset();
        $(document).scroll(function () {
            var pageScrolled = $(document).scrollTop();
            if (elemPosition.top <= pageScrolled) {
                // Make position fixed  and top 0px             
                $('.fixed-header').css('position', 'fixed');
                $('.fixed-header').css('top', '0');
                $('.fixed-header').css('z-index', '9999999');
                $('.fixed-header').css('padding-left', '4%');
                //console.log('Elem pos: ' + elemPosition.top + '------PageScrolled: ' + pageScrolled);
            } else {
                // Make position initila
                $('.fixed-header').css('position', 'initial');
                $('.fixed-header').css('z-index', '0');
                //console.log('Elem pos: ' + elemPosition.top + '------PageScrolled: ' + pageScrolled);
            }

        });



//        $scope.menuHeader = ['Info', 'Gallery', 'Courses', 'Rankings', 'Contact'];
//
//        $scope.menuContentForInfo = [{
//                "submenuHeader": "Institute Type",
//                "subMenuContent": "<p>Engineering is a broad discipine which involves the application of mathematics, empirical evidence and scientific, economic, social, and practical knowledge in order to invent, design, build, maintain, research, and improve, structures, machines, tools, systems, components, materials, and processes.\n\
//</br><b>Approved by </b>It envelopes a wide range of sub-disciplines, each with a more specific emphasis on particular areas of applied science, technology and types of application.</p> "
//            }, {
//                "submenuHeader": "Eligibility & Admission process",
//                "subMenuContent": '<p>MINIMUM ELIGIBILITY</p><div class="row"> <span class="span3"><div class="box-style-2 red"><a href="contact.html" title="Plan a visit"><img src="assets/img/icon-home-visit.png" alt=""><h4>10 + 2</h4><p>Above 60% Marks</p></a></div></span></div><p>For candidates who passed their Board examination , the eligibility criteria for admission is 60% marks (55% marks for SC/ST/PD) in their 12th Standard or equivalent qualifying examination.<br/>   Admission will be based only on category wise All India Rank (AIR) in JEE (Advanced) - 2014, subject to the condition that such candidates are in the top 20 percentile of successful candidates of their Boards in respective categories.</p>'
//            }, {
//                "submenuHeader": "Placements",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Recruiters",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Faculties",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Remarks",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Noted Alumni",
//                "subMenuContent": ''
//            }
//
//        ];
//
//        $scope.menuContentForGallery = [{
//                "submenuHeader": "Infrastructure / Facilities",
//                "subMenuContent": ''
//            }];
//
//        $scope.menuContentForCourses = [{
//                "submenuHeader": "Total Number of courses offered both at Bachelors and Masters",
//                "subMenuContent": ''}, {
//                "submenuHeader": "Courses & Branches",
//                "subMenuContent": ''}, {
//                "submenuHeader": "Number of Seats",
//                "subMenuContent": ''}, {
//                "submenuHeader": "Cutoffs",
//                "subMenuContent": ''}, {
//                "submenuHeader": "Full time/Part time - On campus or Online ",
//                "subMenuContent": ''}, {
//                "submenuHeader": "Duration of the Course",
//                "subMenuContent": ''}, {
//                "submenuHeader": "Fees",
//                "subMenuContent": ''}
//        ];
//
//        $scope.menuContentForRankings = [{
//                "submenuHeader": "Ranking & Ratings",
//                "subMenuContent": ''
//            }];
//
//        $scope.menuContentForContact = [{
//                "submenuHeader": "Location",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Complete Address",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Website",
//                "subMenuContent": ''
//            }, {
//                "submenuHeader": "Contact info",
//                "subMenuContent": ''
//            }];


        $scope.gotoAnchor = function (x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('anchor' + x);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }

        };
    }
]);

app.controller('subHeaderCrt', ['$scope', function ($scope) {

    }]);

app.controller('collageListCrt_', ['$scope', '$http', 'passDataBetweenCrtService',
    function ($scope, $http, passDataBetweenCrtService) {
        var jqueryFunction = function () {
            $('.togglehandle').click(function ()
            {
                $(this).toggleClass('active');
                $(this).next('.toggledata').slideToggle();
            });
        };
        jqueryFunction();

        // lazy loading
        $scope.loadhttp = function () {
            // $http.get('http://jsonplaceholder.typicode.com/posts')
            $scope.myPromise = $http.get('/college/collegelist')
                    .success(function (resp) {
                        $scope.data = resp.message;
                    });
        };
        $scope.quantity = 5;
        $scope.loadMore = function () {
            for (var i = 0; i < 5; i++) {
                $scope.loadhttp();
                $scope.quantity += 5;
            }
        };
        $scope.loadMore();


        // get list of states
        $scope.getStateList = function () {
            $http.get('/static/api/cityList.json').success(function (response) {
                $scope.stateList = response;
            });

        };
        $scope.getStateList();

        // get collage in detail function
        $scope.getCollageInDetail = function (param) {
            passDataBetweenCrtService.setCollegeInService(param);
        };

    }]);

app.controller('collageDetailCrt', ['$scope', '$http', 'passDataBetweenCrtService', 'fileUpload',
    function ($scope, $http, passDataBetweenCrtService, fileUpload) {
        //
        $scope.collegeInDetail = function () {
            $scope.selectedCollege = passDataBetweenCrtService.getCollegeFromService();
            var somedata = $scope.selectedCollege.rank_index;
            var index = somedata.indexOf("/");
            $scope.count = Number(somedata.substring(0, index));
            $scope.total = Number(somedata.substring(index + 1, somedata.length));

            // dummy
            $scope.staffList = ["Anantha Rao Gottimukkala", " Raja Sekhar P", " Naga Swetha Neelakantam", " P Ch Srinivasa Babu", " Balli Kiran Kumar"];
            // dummy
            $scope.eligibility = '<div class="row"><span class="span3"><div class="box-style-2 red"><a href="" title="Plan a visit"><img src="/static/assets/img/icon-home-visit.png" alt=""><h4>10 + 2</h4><p>Above 45% Marks</p></a></div></span><span class="span3"><div class="box-style-2 green"><a href="" title="Plan a visit"><img src="/static/assets/img/icon-home-apply.png" alt=""><h4>Science</h4><p>Stream in 10 + 2</p></a></div></span></div>  <div class="row"><span class="span10"><b>ADMISSION PROCEDURE</b><br/>Admission will be based only on category wise All India Rank (AIR) in JEE (Advanced) - 2014, subject to the condition that such candidates are in the top 20 percentile of successful candidates of their Boards in respective categories.</span></div>';

            // dummy
            $scope.rating1 = 15;
            $scope.rating2 = 2;
            $scope.isReadonly = true;
            $scope.rateFunction = function (rating) {
                console.log('Rating selected: ' + rating);
            };

            // dummy
            $scope.items2 = [{"img_path": "https://www.collegesearch.in/upload/top_recruiter/adobe.gif", "name": "adobe", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/amazon.gif", "name": "amazon", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/cognizant.gif", "name": "cognizant", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/cisco.gif", "name": "cisco", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/bankofindia.gif", "name": "bankofindia", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/barclayscapital.gif", "name": "barclayscapital", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/deloitte.gif", "name": "deloitte", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/futuresfirst.gif", "name": "futuresfirst", "link": ""},
                {"img_path": "https://www.collegesearch.in/upload/top_recruiter/goldmansachs.gif", "name": "goldmansachs", "link": ""}];


        };
        $scope.collegeInDetail();

        //
        $scope.addRecruiter = function (recruiter_name) {
            var file = $scope.myFile;
            var uploadUrl = "api/itemimg";
            fileUpload.uploadFileToUrl(recruiter_name, file, uploadUrl);
            $scope.recruiter_name = '';
            $scope.img = '';
        };
        $scope.deleteRecruiter = function () {

        };

        //
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

app.directive('starRating', function () {
    return {
        restrict: 'EA',
        template:
                '<ul class="star-rating" ng-class="{readonly: readonly}">' +
                '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
                '    <i class="fa fa-star"></i>' + // or &#9733
                '  </li>' +
                '</ul>',
        scope: {
            ratingValue: '=ngModel',
            max: '=?', // optional (default is 5)
            onRatingSelect: '&?',
            readonly: '=?'
        },
        link: function (scope, element, attributes) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            }
            ;
            scope.toggle = function (index) {
                if (scope.readonly == undefined || scope.readonly === false) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelect({
                        rating: index + 1
                    });
                }
            };
            scope.$watch('ratingValue', function (oldValue, newValue) {
                if (newValue) {
                    updateStars();
                }
            });
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