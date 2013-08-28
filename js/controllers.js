'use strict';

/* Controllers */

angular.module('doo2nite.controllers', [])

	.controller('ChatRoomCtrl', ['$scope', '$timeout','angularFireCollection', 
		function($scope, $timeout, angularFireCollection) {
		
			var url = 'https://doo2nite.firebaseio.com/room';
			$scope.messages = angularFireCollection(new Firebase(url + '/messages').limit(50));
			$scope.ideas = angularFireCollection(new Firebase(url + '/ideas').limit(50));
			$scope.username = 'Guest' + Math.floor(Math.random()*101);

			$scope.addMessage = function() {
				var message = { text: $scope.messageText, sender: $scope.username };
				message.even = $scope.messages.length % 2 === 0;
			  $scope.messages.add(message);
			  $scope.messageText = '';
			};
			
			$scope.promote = function(){
				var idea = {text: this.message.text}
				$scope.ideas.add(idea);
			}

		} /* end anymous function ChatRoomCtrl */
  ])
	.directive('autoScroll', 
		function($timeout) {
	  return function(scope, elements, attrs) {
	    scope.$watch("messages.length", function() {
	      $timeout(function() {
	        elements[0].scrollTop = elements[0].scrollHeight
	      });
	    });
	  }
}); /* end angular.module.controller */