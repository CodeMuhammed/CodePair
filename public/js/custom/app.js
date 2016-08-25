 //{}
angular.module('app' , [])

.controller('appController' , function($scope , $state , authy , fireservice , Users , languages) {
  authy.isAuth().then(
    function() {
      $scope.user = authy.getUser();
      startMain();
    },
    function(err) {
      $state.go('home');
    }
  );

  //
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

  //
  $scope.startPairProgramming = function(codePair) {
     Users.setpairCode(codePair);
     $state.go('collaborate');
  };

  //*===This section takes care of CRUD operations on a codePair ===*//
  //=============================================================================

  //This function is called after a user is authenticated. It prevents trying to use
  //Resources that are not yet available
  function startMain() {
     //
     $scope.mode = 'view';
     $scope.languages = languages;

     //This defines the schema for a codePair
     $scope.newCodePair = {
       title: 'Title here',
       description: 'Description here',
       language:'',
       snippetRef:'',
       chatRef:''
     };

     //
     $scope.toggleView = function() {
       $scope.mode = $scope.mode =='view' ? 'edit' : 'view';
     }

     //
     $scope.createCodePair = function(newCodePair) {
        $scope.creatingCodePair = true;
        console.log(newCodePair);
        var snippetKey = fireservice.newSnippet();

        //populate the codePair object with the snippetKey
        //NOTE: the snippetKey and the chatRef are the same
        //But points to different collections
        newCodePair.snippetRef = snippetKey;
        newCodePair.chatRef = snippetKey;

        //Checks to see a a user selected a language else assign a default one
        if(newCodePair.language == '') {
          newCodePair.language = $scope.languages[0];
        }
        

        //Pushes data unto the list
        $scope.user.codeList.created.push(newCodePair);

        //Saves data to the database
        Users.update($scope.user).then(
          function(status) {
            $scope.creatingCodePair= false;
            $scope.toggleView();
            console.log(status);
          },
          function(err) {
            console.log(err);
          }
        );
     }
  }
});
