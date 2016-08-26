/**
 * @description
 *
 * This module controls the main app dashboard scope
*/
angular.module('app' , [])

.controller('appController' , function($scope , $state , $timeout , authy , fireservice , languages) {
  authy.isAuth().then(
    function() {
      $scope.user = authy.getUser();
      startMain();
    },
    function(err) {
      $state.go('home');
    }
  );

  //{}
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


     //get the codePairsRef for this user which is stored at a ref that
     //Tallys with the first part of the user email before the @
     //Mock to see how it is being rendeered on the view
     var id = $scope.user.username.substr(0 , $scope.user.username.indexOf('@'));
     fireservice.syncCodePairs(id , function(codePairs) {
       $timeout(function() {
         $scope.codePairs = codePairs;
         $scope.creatingCodePair = false;
         if($scope.view == 'edit') {
           $scope.view = 'view'
         }
       });
     });

     //This defines the schema for a codePair
     $scope.newCodePairSchema = {
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
       $scope.toggleView();
       $scope.editType = 'new';
       $scope.editableCodePair = newCodePair;

       //
       $scope.saveNewPair = function() {
         console.log(angular.copy($scope.editableCodePair));
         $scope.creatingCodePair = true;

         //
         var snippetKey = fireservice.newSnippet();

         //populate the codePair object with the snippetKey
         //NOTE: the snippetRef, membersRef and the chatRef are the same
         //But points to different collections on firebase.
         $scope.editableCodePair.snippetRef = snippetKey;
         $scope.editableCodePair.chatRef = snippetKey;
         $scope.editableCodePair.membersRef = snippetKey;



         //Checks to see if a user selected a language else assign a default one
         if($scope.editableCodePair.language == '') {
           $scope.editableCodePair.language = $scope.languages[0];
         }

         //create new codePair on firebase
         //@NOTE the codePairs collection that this codePair is pushed to
         //is implicitly defined as at codePairs/@username
         //console.log($scope.editableCodePair);
         fireservice.createCodePair($scope.editableCodePair);
       }
     }

     //{} []
     $scope.editCodePair = function(ref , codePair) {
       $scope.editType = 'old';
       $scope.toggleView();
       $scope.editableCodePair = codePair;

       //
       $scope.saveUpdates = function() {
         //update in fireservice
         //$scope.codePairs[ref] = angular.copy($scope.editableCodePair);
         fireservice.updateCodePair(ref , $scope.editableCodePair);
         $scope.toggleView();
       }
     };

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
