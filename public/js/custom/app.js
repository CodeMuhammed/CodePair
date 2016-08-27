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

     //This function toggles the editor view on and off
     $scope.toggleView = function() {
       $scope.mode = $scope.mode =='view' ? 'edit' : 'view';
     }

     //This creates a new codePair session that you can invite users to
     $scope.createCodePair = function(newCodePair) {
       $scope.toggleView();
       $scope.editType = 'new';
       $scope.editableCodePair = newCodePair;

       //Saves the created session to firebase after editing
       $scope.saveNewPair = function() {
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
         $scope.mode = 'view';
       }
     }

     //Edits an already created codePair session
     $scope.editCodePair = function(ref , codePair) {
       $scope.editType = 'old';
       $scope.toggleView();
       $scope.editableCodePair = codePair;

       //sync with database
       $scope.saveUpdates = function() {
         //update in fireservice
         //$scope.codePairs[ref] = angular.copy($scope.editableCodePair);
         fireservice.updateCodePair(ref , $scope.editableCodePair);
         $scope.toggleView();
       }
     };

     //Deletes a codepair session
     $scope.removeCodePair = function(ref) {
       fireservice.removeCodePair(ref);
     };

     //
     $scope.startPairProgramming = function(codePairRef) {
        console.log(codePairRef);
        //goto collaborate view //{}[]
        $state.go('collaborate' , {id : codePairRef , username:$scope.user.username.substr(0 , $scope.user.username.indexOf('@'))});
     };
  }
})

//This controller serves as an interstatial view that leads to the live coding feed
//The reason this view is important is it makes sure the user is logged in and that the
//Data to be used by the view is available before moving to the live-feed view
.controller('collaborateController' , function($scope , $state , authy , fireservice) {
  console.log('We are in the interstatial view now');
  authy.isAuth().then(
    function() {
      //Get the pairCode object from firebase then pass it to the live view
      fireservice.getCodePair($state.params.username+'/'+$state.params.id , function(pairCode) {
        $state.go('collaborate.live' , {pairCode:pairCode});
      });

    },
    function() {
      $state.go('home');
    }
  );
});
