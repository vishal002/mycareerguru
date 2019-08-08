// Register User Controller.

function RegisterUserController($scope, registerUserService, $http) {
    $scope.currentEducation = registerUserService.getCurrentEducation();
    $scope.needGuidanceFor = registerUserService.getNeedGuidanceFor();
    $scope.majorFieldOfInterest = registerUserService.getMajorFieldOfInterest();
    $scope.heardAboutUs = registerUserService.getHeardAboutUs();
    $scope.city = registerUserService.getCity();
    $scope.pincode = registerUserService.getPincode();

    $scope.user = {};

    $scope.registerUser = function() {
        // api call to register user.
        $http.post('/user/addUser', $scope.user)
                .then(function (response) {
					alert('Successfully Registered');
                })
                .then(function(response){
					alert('Error occurred. Please Try again');
                });
    };

}

angular.module('registerUserApp.registerUserController', ['registerUserApp.registerUserService'])
    .controller('RegisterUserController', RegisterUserController);