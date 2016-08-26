/**
 * @description
 *
 * This module controls the landing page functionality of the application
*/
angular.module('simplyMEAN' , [
   'authyComponent' , 'membersComponent',
   'editorComponent', 'chatComponent',
   'fireserviceModule', 'userserviceModule',
   'config' ,
   'app' , 'LocalStorageModule',
   'ngMessages', 'customDirectives',
   'generalServices'
 ])

//
.controller('homeController' , function($scope , $mdSidenav  , $log){
  //Toggles side menu
  $scope.toggleSidenav = function(side) {
    $mdSidenav(side)
    .toggle()
    .then(function () {
      $log.debug("toggle side is done");
    });
  }
});
