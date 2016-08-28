/**
* This is where firepad - angular js directive goes  //{}
*/
angular.module('mypadComponent' ,  [])

/**
* This is the directive that handles firepad bindings
*/
.directive('mypad' , function() {
  return {
    link : function(scope , elem , attrs) {
       scope.view = attrs.view;
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
    var firepadRef = fireservice.getPadRef($scope.view);

    // Create Ace editor.
    var editor = ace.edit('firepad');

    // Create Firepad.
    var firepad = Firepad.fromACE(firepadRef, editor);
  });
});
