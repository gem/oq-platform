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
		$scope.items = [
			'The first choice!',
			'And another choice for you.',
			'but wait! A third!'
		];
	
		$scope.status = {
			isopen: false
		};
	
		$scope.toggled = function(open) {
			console.log('Dropdown is now: ', open);
		};
	
		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};
	}])
	.config([ function(routeProvider) {
    
	$routeProvider
		.when('/a', {
			templateUrl: '/templates/hrde.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	}])






