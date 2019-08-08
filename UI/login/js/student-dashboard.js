
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cp, angular;

cp = angular.module('student_dashboard', ['ngWYSIWYG']);

cp.controller('studentDashboardCrt', ['$scope', 'allMenuService', '$http', '$log', 'majorFieldsService',
    '$routeParams',
    function ($scope, allMenuService, $http, $log, majorFieldsService, $routeParams) {
        // side menu
        $scope.getSideMenu = function () {
            //
            $http.get('/careeroption/planninglist')
                    .then(function (response) {
                        $scope.sideMenu = response.data.data;
                    });
        };
        $scope.getSideMenu();

        $scope.dataDetail = {};

        $scope.getFeedback = function () {
            $http.get('/testimonial/testimoniallist')
                    .then(function (respo) {
                        $scope.testimonialsList = respo.data.data;
                    });
        };
        $scope.getFeedback();


        $scope.createFeedback = function (index) {
            if ($scope.isEdit) {
                $scope.saveEdit(index);
            } else {
                $scope.dataDetail['show'] = true;
                $http.post('/testimonial/addTestimonial', $scope.dataDetail)
                        .success(function () {
                            console.log("testimonial  created");
                            $scope.dataDetail = {};
                        })
                        .error(function () {
                            console.log("testimonial error occured");
                        });
            }
        };

        /*$scope.delete = function (test_id, index) {
         var payload = {};
         payload.testimonial_id = test_id;
         $http.delete('/testimonial/deleteTestimonial', payload)
         .success(function () {
         console.log("test type delete");
         })
         .error(function () {
         console.log("test type error occured");
         });
         
         // Remove only on success. so remove this code after integration.   
         $scope.testimonialsList.splice(index, 1);
         };*/

        $scope.delete = function (test_id, index) {
            $http({
                url: '/testimonial/deleteTestimonial',
                method: 'DELETE',
                data: {
                    testimonial_id: test_id
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).success(function () {
                console.log("test type delete");
            }).error(function () {
                console.log("test type error occured");
            });
            // Remove only on success. so remove this code after integration.
            $scope.testimonialsList.splice(index, 1);

        };


        $scope.edit = function (test_id, index) {
            $scope.dataDetail = {};
            $scope.dataDetail = $scope.testimonialsList[index];
            if ($scope.dataDetail.text != '')
                $scope.dataDetail.content_type = "text";
            else if ($scope.dataDetail.image != '')
                $scope.dataDetail.content_type = "image";
            else
                $scope.dataDetail.content_type = "video";
            $scope.isEdit = true;
            $scope.dataDetail.itemIndex = index;
            console.log($scope.dataDetail);
        };

        $scope.saveEdit = function (index) {
            $scope.testimonialsList.splice(index, 1, $scope.dataDetail);

            var payload = {};
            payload = JSON.parse(JSON.stringify($scope.dataDetail));
            payload.testimonial_id = $scope.dataDetail.id;
            delete payload.content_type;
            delete payload.itemIndex;
            $http.put('/testimonial/editTestimonial', payload)
                    .success(function () {
                        console.log("test type edit");
                    })
                    .error(function () {
                        console.log("test type error occured");
                    });

            $scope.create = {};
            $scope.isEdit = false;
        };

        // for editor
        $scope.tinymceModel = 'Initial content';

        $scope.getContent = function () {
            $scope.data = $scope.tinymceModel;
        };

        $scope.setContent = function () {
            $scope.tinymceModel = 'Time: ' + (new Date());
        };

        $scope.tinymceOptions = {
            selector: 'textarea',
            height: 500,
            menubar: false,
            plugins: ['advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: '//www.tinymce.com/css/codepen.min.css'
        };



    }]);



