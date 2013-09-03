'use strict';


// Declare app level module which depends on filters, and services
angular.module('doo2nite', 
	[
		'firebase',
		'doo2nite.controllers'
	]
);

document.getElementById('controls').addEventListener('click', function(){
	console.log('rooms clicked');
	document.getElementById('flipBox').toggle();
	return false;
});

document.getElementById('controls2').addEventListener('click', function(){
	console.log('rooms clicked');
	document.getElementById('flipBox').toggle();
	return false;
});