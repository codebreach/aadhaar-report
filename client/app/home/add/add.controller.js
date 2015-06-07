'use strict';

angular.module('aadhaarApp')
  .controller('AddCtrl', function ($scope, Auth, $location, $http) {
    $scope.model = {};
    $scope.errors = {};
    $scope.phaseOneDone = false;

    $scope.verify = function() {
      $http.post('/api/employees/validate', $scope.model)
      .then(function(response) {
        $scope.errors.other = null;
        $scope.phaseOneDone = true;
      })
      .catch(function(error) {
        $scope.errors.other = "Unable to verify identity";
        if (error.data.message) {
          $scope.errors.other += ' ' + error.data.message;
        }
      });
    };

    $scope.verify2 = function() {
      $http.post('/api/employees/validateOtp', $scope.model)
      .then(function(response) {
        $scope.errors.other = null;
        $scope.phaseOneDone = true;
        $location.path('/home/detail/' + response.data._id);
      })
      .catch(function(error) {
        $scope.errors.other = "Unable to verify OTP";
        if (error.data.message) {
          $scope.errors.other += ' ' + error.data.message;
        }
      });
    };
  });
