'use strict';

angular.module('aadhaarApp')
  .controller('HomeCtrl', function ($scope, Auth, $location, $http) {
    $scope.message = 'Hello';
    Auth.isLoggedInAsync(function(isLoggedIn) {
      if (!isLoggedIn) {
        $location.path('/login');
      }
    });

    $scope.currentUser = Auth.getCurrentUser();
    $http.get('/api/employees/for/' + $scope.currentUser._id)
      .then(function(employees) {
        $scope.employees = employees.data;
      });
    $scope.addNewEmployee = function() {
      $location.path('/home/add');
    }
  });
