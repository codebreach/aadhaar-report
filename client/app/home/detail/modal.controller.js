'use strict';

angular.module('aadhaarApp')
  .controller('ModalCtrl', function ($scope, $http, $modalInstance, employee) {
    $scope.model = {};
    $scope.errors = {};
    $scope.publicTypeSelected = false;
    $scope.bankTypeSelected = false;
    $scope.publicTypes = ['Driving Record', 'Criminal Record', 'Court Case', 'Living Situation'];
    $scope.bankTypes = [
      'Credit Card', 'Current', 'Savings',
      'Fixed Deposit', 'Home Loan', 'Student Loan',
      'Auto Loan', 'Other Loan', 'Other'
    ];
    $scope.$watch('model.reportType', function() {
      $scope.publicTypeSelected = $scope.model.reportType == 'Public Report';
      $scope.bankTypeSelected = $scope.model.reportType == 'Bank Report';;
    });
    $scope.ok = function () {
      var item = null;
      var target = null;
      if ($scope.publicTypeSelected) {
        item = {
          kind: $scope.model.subType,
          severity: 1,
          recordId: $scope.model.recordId,
          recordDate: $scope.model.recordDate,
          guilty: $scope.model.guilty
        };
        target = 'publicReport';
      } else if ($scope.bankTypeSelected) {
        item = {
          kind: $scope.model.subType,
          severity: 1,
          amount: $scope.model.lastAmount,
          bank: $scope.model.bank,
          openDate: $scope.model.openDate,
          defaults: $scope.model.defaults
        };
        target = 'bankReport';
      } else {
        $scope.errors.other = 'Please select a report type.';
        return;
      }
      $scope.errors.other = null;
      $http.put('/api/employees/' + employee._id + '/' + target, item)
      .then(function(savedEmployee) {
        $modalInstance.close(savedEmployee);
      })
      .catch(function(error) {
        $scope.errors.other = error.data.message;
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
