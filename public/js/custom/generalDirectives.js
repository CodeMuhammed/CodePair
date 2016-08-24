(function(){
  'use strict';

  angular.module('customDirectives' , [])
     .directive('compare' , function(){
           return {
           	   restrict: 'A',
           	   require: 'ngModel',
           	   link: function(scope , elem , attrs , ngModel){
                   ngModel.$validators.compare = function(modelValue){
                        return scope.newUser.password == modelValue;
                   }
           	   }
           }
     })

     .directive('fullname' , function(){
           return {
           	   restrict: 'A',
           	   require: 'ngModel',
           	   link: function(scope , elem , attrs , ngModel){
                   ngModel.$validators.fullname = function(modelValue){
                      if(modelValue){
                           var spaces  = function(){
                               var count =0;
                               for(var i=0; i<modelValue.length; i++){
                                   modelValue[i] == ' ' ? count++ : count;
                               }
                               return count;
                            };
                            return (/^[a-zA-Z ]+$/.test(modelValue) && spaces() == 1 && modelValue[modelValue.length - 1] !== ' ');
                      }
                      else {
                        return false;
                      }

                   }
           	   }
           }
     })
      .directive('phone' , function(){
           return {
               restrict: 'A',
               require: 'ngModel',
               link: function(scope , elem , attrs , ngModel){
                   ngModel.$validators.phone = function(modelValue){
                        if(modelValue){
                            return modelValue.length == 11 && /^[0-9]+$/.test(modelValue);
                        }
                        else {
                          return false;
                        }

                   }
               }
           }
     })
    .directive('username' , function(){
           return {
               restrict: 'A',
               require: 'ngModel',
               link: function(scope , elem , attrs , ngModel){
                   ngModel.$validators.username = function(modelValue){
                        if(modelValue){
                            return /^[a-z0-9]+$/.test(modelValue);
                        }
                        else {
                          return false;
                        }

                   }
               }
           }
     })
})();
