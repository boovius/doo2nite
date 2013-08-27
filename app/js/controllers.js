'use strict';

/* Controllers */

angular.module('doo2nite.controllers', [])

	.controller('ChatRoomCtrl', ['$scope', 'angularFire', function($scope, angularFire) {
		
		var url = 'https://doo2nite.firebaseio.com/room';
		var promise = angularFire(url, $scope, 'room', {messages: [], ideas: []});


		$scope.clearRoom = function(){
			$scope.room.messages = [];
			$scope.room.ideas = [];
		}

		$scope.addThing = function(){
			$scope.room.apricot = 'apricot';
		}
		
		$scope.addMessage = function() {
			
			if ($scope.messageText != ''){
				var message = {text: $scope.messageText, even: true};
				$scope.messageText = '';	
				if ($scope.room.messages.length % 2 === 0){
					message.even = true;
				}
				else {
					message.even = false;
				}
			  $scope.room.messages.push(message);
			  
		  }

		};
		
		$scope.promote = function(){
			var idea = {text: this.message.text}
			$scope.room.ideas.push(idea);
		}

		promise.then(function(){
			$scope.$watch('room', $scope.addMessage);
		})
	} /* end anymous function ChatRoomCtrl */
]); /* end angular.module.controller */