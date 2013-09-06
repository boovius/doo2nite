'use strict';

/* Controllers */

var doo2nite = angular.module('doo2nite.controllers', [])

	.controller('ChatRoomCtrl', ['$scope', '$rootScope', 'RoomName', '$timeout', '$routeParams', '$cookies', 'angularFireCollection', 
		function($scope, $rootScope, RoomName, $timeout, $routeParams, $cookies, angularFireCollection) {

			var url = 'https://doo2nite.firebaseio.com/rooms/' + $routeParams.room;

			//setting room name 
			$rootScope.room = new Firebase(url);
			$rootScope.room.once('value', function(dataSnapShot){
				var ref = dataSnapShot.ref();
				if (!dataSnapShot.hasChild('roomName'))
				{
					ref.set({roomName: $rootScope.roomName});
				}
				else {
					$rootScope.roomName = dataSnapShot.val().roomName;
					$rootScope.$apply();
				}
			})

			//setting user name
			$scope.showNameInput = true;
			if ($cookies.username){
				$scope.username = $cookies.username;
			}
			else
			{
				$scope.username = 'Guest' + Math.floor(Math.random()*101);
			}
			

			$scope.messages = angularFireCollection(new Firebase(url + '/messages'));
			$scope.ideas = angularFireCollection(new Firebase(url + '/ideas'));
			$scope.users = angularFireCollection(new Firebase(url + '/users'));
			
			

			$scope.addMessage = function() {
				$scope.showNameInput = false;
				$scope.showNameStatic = true;
				$cookies.username = $scope.username;
				console.log('$cookies.username after message send', $cookies.username);
				var message = { text: $scope.messageText, sender: $scope.username };
				message.even = $scope.messages.length % 2 === 0;
			  $scope.messages.add(message);
			  $scope.messageText = '';
			};
			
			$scope.promote = function(index){
				var idea = {text: this.message.text, sender: this.message.sender, voted: [$scope.username]}
				$scope.messages.remove(this.message);
				$scope.ideas.add(idea);
			}

			$scope.votedon = function() {
				return (this.idea.voted.indexOf($scope.username) != -1);
			}

			$scope.voteup = function(){
				var notVoted = true;
				for (var i=0; i<this.idea.voted.length; i++){
					if (this.idea.voted[i] === $scope.username){
						notVoted = false;
						this.idea.voted.pop($scope.username);
						if (this.idea.voted.length == 0){
							var message = {text: this.idea.text, sender: this.idea.sender}
							$scope.messages.add(message);
							$scope.ideas.remove(this.idea);
							
						}
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
  ]) /*end controller ChatRoomCtrl */

	.controller('NewRoomCtrl', ['$scope', '$rootScope', 'RoomName', '$timeout', '$location', '$cookies', 'angularFireCollection', 
			function($scope, $rootScope, RoomName, $timeout, $location, $cookies, angularFireCollection) {

				var url = 'https://doo2nite.firebaseio.com/rooms/';
				$scope.rooms = angularFireCollection(new Firebase(url)); 	


				$scope.newRoom = function(){
					console.log('new room clicked!');
					var pth = Math.floor(Math.random() * 99999);
					$location.path("/" + pth);
					var randomRoom = 'Room ' + pth;
					$rootScope.roomName = $scope.roomName || randomRoom;
					alert('Send the following link to your friends: ' + "\n" + $location.absUrl());
					return false;
			}
		}
	]) /* end NewRoomCtrl angular.module.controller */

.directive('messageScroll', 
	function($timeout) {
  return function(scope, elements, attrs) {
    scope.$watch("messages.length", function() {
      $timeout(function() {
        elements[0].scrollTop = elements[0].scrollHeight
      });
    });
  }
})

.directive('ideaScroll', 
	function($timeout) {
  return function(scope, elements, attrs) {
    scope.$watch("ideas.length", function() {
      $timeout(function() {
        elements[0].scrollTop = elements[0].scrollHeight
      });
    });
  }
})

.factory('RoomName', function(){
	var roomName = 'Room' + Math.floor(Math.random()*101);
	return {message: roomName}
}); 




