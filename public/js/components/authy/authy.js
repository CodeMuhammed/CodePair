/**
 *Handles authentication for the application //{}[]
*/
angular.module('authyComponent' , [])
    //
    .directive('authy' , function(){
        return{
           link:function(scope , elem , attrs){
               scope.destination = attrs.destination;
               attrs.notify ? scope.notify = attrs.notify : '';
           },
           transclude:true,
           templateUrl:'js/components/authy/authy.html',
           controller: 'authController'
        };
    })

    .factory('authy' , function($http , $timeout , $q){
         var authStatus = false;
         var user = '';

         //
         function isAuth(){
             var promise = $q.defer();
             if(authStatus){
                 promise.resolve();
             }
             else{
                 //The _ is when you don't really provide useful variables
                 login({username:'_' , password:'_'}).then(
                      function(){
                          promise.resolve();
                      },
                      function(err){
                          promise.reject(err);
                      }
                 );
             }
             return promise.promise;
         }

         //
         function getUser() {
           return user;
         }

         //
         function login(userAuth){
           var promise = $q.defer();
           $http({
               method: 'POST',
               url: '/auth/login',
               data:userAuth
           })
           .success(function(userInfo){
               authStatus = true;
               user = userInfo;
               promise.resolve();
           })
           .error(function(err){
               promise.reject(err);
           });

           return promise.promise;
         }

         //{}
         function signup(newUser) {
           console.log(newUser);
           var promise = $q.defer()

           $http({
               method: 'POST',
               url: '/auth/signup',
               data : newUser
           })
           .success(function(userInfo){
               user = userInfo;
               authStatus = true;

               promise.resolve(true);
           })
           .error(function(err){
               promise.reject(err);
           });

           return promise.promise;
         }

         //
         function logout(){
             var promise = $q.defer();
             $http({
                 method: 'GET',
                 url: '/auth/logout'
             })
             .success(function(user){
                 authStatus = false;
                 user = '';
                 promise.resolve(true);
             })
             .error(function(err){
                 promise.reject(err);
             });

             return promise.promise;
         }

         //
         return {
             isAuth : isAuth,
             getUser: getUser,
             login : login,
             signup: signup,
             logout:logout
         };
    })

    .controller('authController' , function($scope  , $state , $timeout , authy , localStorageService){
        //initialize local storage for user auth
        var lastpass = localStorageService.get('lastpass');
        if(!lastpass){
            localStorageService.set('lastpass' , {username:'' , password:''});
            lastpass = localStorageService.get('lastpass');
        }
        console.log('lastpass: ', lastpass);

        $scope.authView ='login';
        $scope.userAuth = lastpass;
        $scope.newUser = lastpass;

        //
        $scope.toggleView = function() {
          $scope.authView = $scope.authView =='login'? 'signup' : 'login';
        }

        //
        $scope.loginUser = function(userAuth){
          $scope.loggingin =true;
          authy.login(userAuth).then(
            function(status){
              console.log('logged iin');
              localStorageService.set('lastpass' , userAuth);
              if($scope.notify){
                $scope.$eval($scope.notify);
              }
              $scope.loggingin = false;
              $state.go($scope.destination);
            },
            function(err){
              $scope.loggingin  = false;
              alert(err)
            }
          );
        }

        //
        $scope.signupUser = function(newUser) {
          $scope.signingup = true;

          //
          console.log(newUser);

          authy.signup(newUser).then(
            function(status) {
              console.log(status);
              localStorageService.set('lastpass' , {username:newUser.username , password:newUser.password});

              $scope.signingup  = false;
              $state.go($scope.destination);
            },
            function(err) {
              $scope.signingup  = false;
              alert(err)
            }
          );
        }
    });
