/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var utilSer, angular;

utilSer = angular.module('utilService', []);

utilSer.service('majorFieldsService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/majorfields/majorfieldslist').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMajorfieldsList = function () {
        return deferred.promise;
    };
});

utilSer.service('allMenuService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/menu.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

// Left section data for Aptitude/Ability Tests.
utilSer.service('aptitudeAbilityTestsleftSectionService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/aptitudeAbilityTestsleftSection.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

// Left section data for Aptitude/Ability Create Test.
utilSer.service('aptitudeCreateTestLeftSectionService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/aptitudeCreateTestLeftSection.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

// Left section data for Mentoring Tests.
utilSer.service('mentoringLeftSectionService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/mentoringLeftSection.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

// Left section data for Mentoring Tests.
utilSer.service('menteeLeftSectionService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/menteeLeftSection.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

// Left section data for Mentoring Tests.
utilSer.service('mentorLeftSectionService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/mentorLeftSection.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

utilSer.service('footerMenuService', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/static/api/footer.json').then(function (data) {
        deferred.resolve(data);
    });
    // 
    this.getMenuList = function () {
        return deferred.promise;
    };
});

utilSer.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
});

// for courses_&_colleges
utilSer.service('passDataBetweenCrtService', function () {
    var selectedCollege = [];

    //setter
    var setCollegeInService = function (param) {
        selectedCollege = param;
    };

    //gettere
    var getCollegeFromService = function () {
        return selectedCollege;
    };

    return {
        setCollegeInService : setCollegeInService,
        getCollegeFromService : getCollegeFromService
    };

});

// for entrance_and_scholarship_exams
utilSer.service('passDataBetweenCrt2Service', function () {
    var selectedExam = [];

    //setter
    var setExamInService = function (param) {
        selectedExam = param;
    };

    //gettere
    var getExamFromService = function () {
        return selectedExam;
    };

    return {
        setExamInService : setExamInService,
        getExamFromService : getExamFromService
    };

});

// for schools
utilSer.service('passDataBetweenCrt3Service', function () {
    var selectedSchool = [];

    //setter
    var setSchoolInService = function (param) {
        selectedSchool = param;
    };

    //gettere
    var getSchoolFromService = function () {
        return selectedSchool;
    };

    return {
        setSchoolInService : setSchoolInService,
        getSchoolFromService : getSchoolFromService
    };

});

// for schools
utilSer.service('passDataBetweenCrt4Service', function () {
    var selectedScholarships = [];

    //setter
    var setScholarshipsInService = function (param) {
        selectedScholarships = param;
    };

    //gettere
    var getScholarshipsFromService = function () {
        return selectedScholarships;
    };

    return {
        setScholarshipsInService : setScholarshipsInService,
        getScholarshipsFromService : getScholarshipsFromService
    };

});




