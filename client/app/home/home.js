'use strict';

angular.module('aadhaarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('home.list', {
        url: '/list',
        templateUrl: 'app/home/list/list.html',
      })
      .state('home.add', {
        url: '/add',
        templateUrl: 'app/home/add/add.html',
        controller: 'AddCtrl'
      })
      .state('home.detail', {
        url: '/detail/:id',
        templateUrl: 'app/home/detail/detail.html',
        controller: 'DetailCtrl'
      });
  });
