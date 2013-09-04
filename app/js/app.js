'use strict';


// Declare app level module which depends on filters, and services
angular.module('doo2nite', 
	[
		'firebase',
		'doo2nite.controllers',
		'ngCookies'
	]
).config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/new', {templateUrl: 'partials/new.html', controller: 'NewRoomCtrl'});
		$routeProvider.when('/:room', {templateUrl: 'partials/room.html', controller: 'ChatRoomCtrl'});
    $routeProvider.otherwise({redirectTo: '/new'});
}]);
