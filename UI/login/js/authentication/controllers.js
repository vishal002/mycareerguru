'use strict';

angular.module('Authentication', ['AuthenticationSer'])
        .controller('LoginController',
                ['$scope', '$rootScope', '$location', 'AuthenticationService', '$window',
                    function ($scope, $rootScope, $location, AuthenticationService, $window) {
                        // reset login status
                        AuthenticationService.ClearCredentials();
                        $scope.login = function (param1, param2) {
                            $scope.dataLoading = true;
              AuthenticationService.Login(param1, param2, function (response) {
                                if (response.success) {
                                    AuthenticationService.SetCredentials(param1, param2);
                                    $location.path('/home');
                                } else {
                                    $scope.error = response.message;
                                    $scope.dataLoading = false;
                                }
                            });
                        };
                    }]);