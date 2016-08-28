/**
* This is where firepad - angular js directive goes  //{}
*/
angular.module('mypadComponent' ,  [])

/**
* This is the directive that handles firepad bindings
*/
.directive('mypad' , function() {
  return {
    scope: {
      mode: '=mode'
    },
    link : function(scope , elem , attrs) {
       scope.ref = attrs.ref;
    },
    restrict: 'E',
    template : '<div id="firepad"></div>',
    controller: 'mypadController'
  }
})

/**
* This is the controller that  handles the firepad initialization and settings
*/
.controller('mypadController'  , function($scope , $timeout ,  fireservice) {
  $timeout(function() {
    // Get Firebase Database reference.
    console.log($scope.ref , $scope.mode);
    var firepadRef = fireservice.getPadRef($scope.ref);

    // Create Ace editor.
    var editor = ace.edit('firepad');
    editor.setTheme("ace/theme/twilight");

    // Create Firepad.
    var firepad = Firepad.fromACE(firepadRef, editor);

    //watch when language mode changes
    $scope.$watch('mode' , function(newVal) {
      if(newVal) {
        editor.getSession().setMode("ace/mode/"+angular.lowercase(newVal))
      }
    });
  });
});
