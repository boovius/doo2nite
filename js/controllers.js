'use strict';

/* Controllers */

angular.module('doo2nite.controllers', [])

	.controller('ChatRoomCtrl', ['$scope', 'angularFireCollection', 
		function($scope, angularFireCollection) {
		
			var url = 'https://doo2nite.firebaseio.com/room';
			$scope.messages = angularFireCollection(new Firebase(url + '/messages').limit(50));
			$scope.ideas = angularFireCollection(new Firebase(url + '/ideas').limit(50));

			$scope.addMessage = function() {
				var message = { text: $scope.messageText };
				message.even = $scope.messages.length % 2 === 0;
			  $scope.messages.add(message);
			  $scope.messageText = '';
			};
			
			$scope.promote = function(){
				var idea = {text: this.message.text}
				console.log($scope.ideas.add);
				$scope.ideas.add(idea);
			}

		} /* end anymous function ChatRoomCtrl */
]); /* end angular.module.controller */