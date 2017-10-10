'use strict';

var test = angular.module('test', ['ui.router']);

test.config(function($stateProvider, $urlRouterProvider) {
    // i18n


    $urlRouterProvider.otherwise('/overview');
    // Now set up the states
    $stateProvider
        .state('overview', {
            url: '/overview',
            templateUrl: 'overview.html',
            controller: 'OverviewCtrl'
        })
        .state('config', {
            url: '/config',
            templateUrl: 'config.html',
            controller: 'ConfigCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller: 'DashboardCtrl'
        });


        
});