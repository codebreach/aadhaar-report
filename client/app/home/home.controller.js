'use strict';

angular.module('aadhaarApp')
  .controller('HomeCtrl', function ($scope, Auth, $location, $http) {
    $scope.notLoaded = true;
    Auth.isLoggedInAsync(function(isLoggedIn) {
      if (!isLoggedIn) {
        $location.path('/login');
      }
    });

    $scope.currentUser = Auth.getCurrentUser();
    $scope.currentUser.$promise.then(function() {
      $http.get('/api/employees/for/' + $scope.currentUser._id)
      .then(function(employees) {
        $scope.notLoaded = false;
        $scope.employees = employees.data;
      });
    });
    $scope.addNewEmployee = function() {
      $location.path('/home/add');
    }
  });
