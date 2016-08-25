//@TODO implement this controller //{}[]
angular.module('simplyMEAN' , [
   'config' ,'authyComponent' ,
   'fireserviceModule', 'userserviceModule',
   'editorComponent', 'chatComponent',
   'app' , 'LocalStorageModule',
   'ngMessages', 'customDirectives',
   'generalServices'
 ])

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
