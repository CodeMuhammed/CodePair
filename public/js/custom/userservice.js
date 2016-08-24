/**
 *This module connects with the /users endpoint on the server //{}[]
 */
angular.module('userserviceModule' , [])

.factory('Users' , function($q , $http) {
   //This instance variable holds the current pairCode that is actively viewed
   var currentPair;

   //This function persists the changes made to a user collection to the server
   function update(user) {
      var promise = $q.defer();

      //Make a POST request to update the user on the server
      $http({
        method:'POST',
        url:'/users',
        data:user
      })
      .success(function(status) {
          promise.resolve(status);
      })
      .error(function(err) {
          promise.reject(err);
      });
      return promise.promise;
   }

   //This function sets the selected pairCode during route transformation
   function setpairCode(pairCode) {
     currentPair = pairCode;
   }

   //This function returns the pairCode code to the client
   function getPairCode() {
     return currentPair;
   }

   //
   return {
     update:update,
     setpairCode:setpairCode,
     getPairCode:getPairCode
   }
});
