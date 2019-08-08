// Register User Service.

function registerUserService() {
    var
        currentEducation,
        needGuidanceFor,
        majorFieldOfInterest,
        heardAboutUs,
        city,
        pincode,
        factory = {};

    currentEducation = ['Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII','Undergraduate Student of Commerce','Undergraduate Student of Science','Undergraduate Student of Arts','Undergraduate Student of Engineering','Undergraduate Student of Medicine','Undergraduate Student of Dentistry','Undergraduate Student of Architecture/Design','Undergraduate Student of Management','Undergraduate Student of other Health Science Courses','Any other Undergraduate Courses','Postgraduate Student of Commerce','Postgraduate Student of Science','Postgraduate Student of Arts','Postgraduate Student of Engineering','Postgraduate Student of Medicine','Postgraduate Student of Dentistry','Postgraduate Student of Architecture/Design','Postgraduate Student of Management','Postgraduate Student of other Health Science Courses','Any other Postgraduate Courses'] ;
    needGuidanceFor = ['Selecting a Career','Selecting a College','Selecting a Course','Specific Entrance Exam','Admission Help','Study Abroad','Mentoring','Searching a better School','Searching a better coaching','Other'];
    heardAboutUs = ['Friend','Principal/Teachers of School/College','Social Network','Advertisements'];

    // Test Data for the below fields. Update with the valid data.
    majorFieldOfInterest = ['Engineering','Medical','Administration','Commerce/Economics','Arts'];
    city = ['Delhi','Mumbai','Chennai','Banglore','Kolkata','Ahmedabad','Hyderabad','Pune'];
    pincode = [111111,222222,333333,444444,555555];

    factory.getCurrentEducation = function() {
        return currentEducation;
    }

    factory.getNeedGuidanceFor = function() {
        return needGuidanceFor;
    }

    factory.getMajorFieldOfInterest = function() {
        return majorFieldOfInterest;
    }

    factory.getHeardAboutUs = function() {
        return heardAboutUs;
    }

    factory.getCity = function() {
        return city;
    }

    factory.getPincode = function() {
        return pincode;
    }

    return factory;
}

angular.module('registerUserApp.registerUserService', [])
    .factory('registerUserService', registerUserService);
