/**
 *Handles the ace editor instance that eventually syncs to firebase //{}[]
*/

angular.module('editorComponent' , [])

//This directive paints the code editor instance on the screen
.directive('aceFire' , function(){
    return{
       link:function(scope , elem , attrs){
           //@TODO add attrs here
           //scope.destination = attrs.destination;
       },
       templateUrl:'js/components/ace-editor/ace-editor.html',
       controller: 'aceController'
    };
})

//This controls the code editing view of the application
.controller('aceController' , function($scope , $timeout , $state ,  fireservice , Users) {
  //List of programming languages supported by the editor
  $scope.languages = [
    'Java' , 'C++' , 'C' , 'Python' , 'JavaScript' , 'Ruby' , 'PHP',
    'Objective C' , 'C#' , 'Go' , 'Perl' , 'Scala' , 'CoffeScript' , 'Clojure',
    'Haskell' , 'Erlang', 'scheme' , 'xml' ,  'text'
  ];

  //Holds the working version of the code
  $scope.pairCode = Users.getPairCode();

  //Checks to see if $scope.pairCode is defined
  if(!$scope.pairCode) {
    $state.go('app');
  }
  else {
    $scope.codeSnippet = '';

    //Synchronize data at the snippet ref
    fireservice.syncSnippet($scope.pairCode.snippetRef).then(null, null , function(updatedVal) {
      $scope.codeSnippet = updatedVal;
    });

    //This watches as the user types in realtime and updates firebase with it
    $scope.$watch('codeSnippet' , function(newVal , oldVal) {
      if(newVal && newVal!=oldVal) {
        $timeout(function() {
          fireservice.updateSnippet($scope.codeSnippet);
        }, 300);
      }
    });

    //*This section handles ui manipulations =================================*//
    //==========================================================================//
    $scope.langMenuVisible = false;
    $scope.activeLang = $scope.languages[0];

    //
    $scope.togglelangOptionMenu = function() {
      $scope.langMenuVisible = !$scope.langMenuVisible;
    }

    //
    $scope.setLang = function(lang) {
      $scope.activeLang = lang;
      $scope._session.setMode("ace/mode/" + angular.lowercase(lang))
      $scope.langMenuVisible = false;
    }


    //
    $scope.peerMenuVisible = false;
    $scope.togglePeerMenu = function() {
      $scope.peerMenuVisible = !$scope.peerMenuVisible;
    }

    //{}[]
    $scope.aceLoaded = function(_editor){
      // Editor part
      $scope._session = _editor.getSession();
    };

  }


});
