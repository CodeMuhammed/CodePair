/**
 * @description
 *
 * This object provides a utility for producing a source code editor
 * that synchronizes in realtime with firebase and acrross multiple connected
 * Client devices in real-time
 *
 * @param {*} string The namespace to use for this module functions
 * @param {*} array A list of external modules and dependencies of this modlue
 */
angular.module('editorComponent' , [])

/**
 * @description
 *
 * This controls the code editing view of the application
 */
.controller('liveEditorController' , function($scope , $timeout , $state , $stateParams, fireservice , authy , languages) {

  //Holds the version of the current pair coding session
  $scope.pairCode = $stateParams.pairCode;

  //checks to see if $scope.pairCode is defined
  if($scope.pairCode) {
    //This is the absolute url for collaborating on the app
    $scope.sessionUrl = $state.href($state.current.name, $state.params, {absolute: true});
    $scope.sessionUrl = $scope.sessionUrl.substr(0 , $scope.sessionUrl.indexOf('/live'));

    //List of programming languages supported by the editor
    $scope.languages = languages;
    $scope.activeLang = '';

    //Holds the user
    $scope.user = authy.getUser();

    //Holds the member details that binds with the members directive//{}[]
    $scope.member = {
      role: $scope.pairCode.admin == $scope.user.username ? 'admin' : 'member',
      fullname: $scope.user.fullname,
      writable: true,
      username: $scope.user.username
    };

    //Sets default active language
    $scope.activeLang = $scope.pairCode.language;

    //
    $scope.setLang = function(lang) {
      console.log(lang);
      $scope.activeLang = lang;
      $scope.langMenuVisible = false;
    }

    //*This section handles ui manipulations =================================*//
    //==========================================================================//
    $scope.langMenuVisible = false;

    //
    $scope.togglelangOptionMenu = function() {
      $scope.langMenuVisible = !$scope.langMenuVisible;
    }

    //
    $scope.peerMenuVisible = true;
    $scope.togglePeerMenu = function() {
      $scope.peerMenuVisible = !$scope.peerMenuVisible;
    }
  }
});
