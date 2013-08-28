'use strict';

/* Controllers */

angular.module('doo2nite.controllers', [])

	.controller('ChatRoomCtrl', ['$scope', 'angularFire', function($scope, angularFire) {
		
		var url = 'https://doo2nite.firebaseio.com/room';
		var promise = angularFire(url, $scope, 'room', { messages: [], ideas: [] });

		promise.then(function(){
			//$scope.$watch('room', $scope);

			$scope.room.ideas = [];

			$scope.addMessage = function() {	
				var message = { text: $scope.messageText };
				message.even = $scope.room.messages.length % 2 === 0;
			  $scope.room.messages.push(message);	
			  $scope.messageText = '';
			};
			
			$scope.promote = function(){
				$scope.room.ideas = $scope.room.ideas || [];
				var idea = {text: this.message.text}
				$scope.room.ideas.push(idea);
			}
		})

	} /* end anymous function ChatRoomCtrl */
]); /* end angular.module.controller */