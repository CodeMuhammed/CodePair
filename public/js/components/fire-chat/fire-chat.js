/**
 * @description
 *
 * Handles the chatting segment of the pair programming sesssion and synchronizes with firebase
*/

angular.module('chatComponent' , [])

//This is a component directive
.directive('fireChat' , function(){
  return{
    link:function(scope , elem , attrs){
      scope.ref = attrs.ref;
      scope.member = attrs.member;
    },
    templateUrl:'js/components/fire-chat/fire-chat.html',
    controller: 'chatController'
  };
})

//This controller implements the functionality of the chat interface and syncs the data to firebase
.controller('chatController' , function($scope , $timeout , fireservice) {

  $timeout(function() {
    fireservice.syncChat($scope.ref , function(chatHistory) {
      $timeout(function() {
         $scope.chatHistory = Object.values(chatHistory);
      });
    });
  });

  //This posts a new chat message to the history
  $scope.postMessage = function(postText) {
    //
    if(postText.length > 0) {
      var newPost = {
        text:postText,
        username:$scope.member.username,
        posted: Date.now()
      };
      fireservice.postChat(newPost);
    }
  }
});
