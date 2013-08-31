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
			
			$scope.promote = function(index){
				var idea = {text: this.message.text, voted: [$scope.username]}
				$scope.ideas.add(idea);
				$scope.votedon = true;
			}

			$scope.votedon = function() {
				return (this.idea.voted.indexOf($scope.username) != -1);
			}

			$scope.votes = function(){
				return this.idea.voted.length;
			}

			$scope.voteup = function(){
				var notVoted = true;
				for (var i=0; i<this.idea.voted.length; i++){
					if (this.idea.voted[i] === $scope.username){
						notVoted = false;
						break;
					}
					else {
						notVoted = true;
					}
				}
				if (notVoted){
					this.idea.voted.push($scope.username);
					$scope.ideas.update(this.idea)

				}
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