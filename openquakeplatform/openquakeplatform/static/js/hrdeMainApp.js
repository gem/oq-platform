'use strict';

/**
 * @ngdoc overview
 * @name leafletTestApp
 * @description
 * # leafletTestApp
 *
 * Main module of the application.
 */
 
angular
  .module('testApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
  ])
  .controller("AppController", ["$scope", function($scope){
	$scope.username = "Pals";	
  }])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider, routeProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('education', {
        url: '/education',
        templateUrl: 'education/index.html'
      })
	$routeProvider
      .when('/a', {
        templateUrl: '/templates/hrde.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])





