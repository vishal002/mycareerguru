// Register User Controller.

function RegisterUserController($scope, registerUserService) {
    $scope.currentEducation = registerUserService.getCurrentEducation();
    $scope.needGuidanceFor = registerUserService.getNeedGuidanceFor();
    $scope.majorFieldOfInterest = registerUserService.getMajorFieldOfInterest();
    $scope.heardAboutUs = registerUserService.getHeardAboutUs();
    $scope.city = registerUserService.getCity();
    $scope.pincode = registerUserService.getPincode();

}

angular.module('registerUserApp.registerUserController', ['registerUserApp.registerUserService'])
    .controller('RegisterUserController', RegisterUserController);