'use strict';

angular.module('aadhaarApp')
  .controller('DetailCtrl', function ($scope, Auth, $stateParams, $http, $modal) {
    $scope.model = {};
    $scope.gauge = {
      width: 400,
      value: 0,
      valueUnit: '',
      precision: 1,
      lowerLimit: 0,
      upperLimit: 800,
      ranges: [
        {
          min: 0,
          max: 200,
          color: '#C50200'
        },
        {
          min: 200,
          max: 400,
          color: '#FF7700'
        },
        {
          min: 400,
          max: 600,
          color: '#FDC702'
        },
        {
          min: 600,
          max: 800,
          color: '#8DCA2F'
        }
      ]
    };
    var loadData = function() {
      $http.get('/api/employees/' + $stateParams['id']).then(function(response) {
        $scope.model = response.data;
        $scope.gauge.value = response.data.score;
      });
    }
    $scope.addReport = function() {
       $modal.open({
          animation: true,
          templateUrl: 'app/home/detail/modal.html',
          controller: 'ModalCtrl',
          size: 'lg',
          resolve: {
            employee: function () {
              return $scope.model;
            }
          }
        }).result.then(function() {
          loadData();
        });
    };

    loadData();
  });
