/**
 * @description
 *
 * This module controls the main app dashboard scope
*/
angular.module('app' , [])

.controller('appController' , function($scope , $state , authy , fireservice , languages) {
  authy.isAuth().then(
    function() {
      $scope.user = authy.getUser();
      startMain();
    },
    function(err) {
      $state.go('home');
    }
  );

  //{} []
  $scope.logout = function() {
    authy.logout().then(
      function(status) {
        $state.go('home');
      },
      function(err) {
        alert(err);
      }
    );
  };

  //*===This section takes care of CRUD operations on a codePair ===*//
  //=============================================================================

  //This function is called after a user is authenticated. It prevents trying to use
  //Resources that are not yet available
  function startMain() {
     //
     $scope.mode = 'view';
     $scope.languages = languages;

     //
     //@TODO get the codePairsRef for this user which is stored at a ref that
     //Tallys with the first part of the user email before the @

     //This defines the schema for a codePair
     $scope.newCodePair = {
       admin: $scope.user.username,
       title: 'Title here',
       description: 'Description here',
       language:'',
       snippetRef:'',
       chatRef:'',
       membersRef:''
     };

     //
     $scope.toggleView = function() {
       $scope.mode = $scope.mode =='view' ? 'edit' : 'view';
     }

     //
     $scope.createCodePair = function(newCodePair) {
        $scope.creatingCodePair = true;
        var snippetKey = fireservice.newSnippet();

        //populate the codePair object with the snippetKey
        //NOTE: the snippetRef, membersRef and the chatRef are the same
        //But points to different collections on firebase.
        newCodePair.snippetRef = snippetKey;
        newCodePair.chatRef = snippetKey;
        newCodePair.membersRef = snippetKey;

        console.log(newCodePair);

        //Checks to see if a user selected a language else assign a default one
        if(newCodePair.language == '') {
          newCodePair.language = $scope.languages[0];
        }

        //@TODO create new codePair on firebase
     }

     //
     $scope.startPairProgramming = function(codePairRef) {
        console.log(codePairRef);
        //@TODO goto collaborate view
        //$state.go('collaborate' , {id : codePairRef});
     };

  }
})

//This collaborate view takes care of handling the view where users can come to code as a team
//On a snippet of code
.controller('collaborateController' , function($scope , $state , $stateParams) {
    console.log($stateParams.id + 'Here');
});
