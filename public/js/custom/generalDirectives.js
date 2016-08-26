/**
 * @description
 *
 * This module holds useful utility directives and constants that might be used through the application
*/
angular.module('customDirectives' , [])

/**
 * @description
 *
 * This directive compares the value on the input field to see if it is
 * Equal to the password field in the user object
*/
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

/**
 * @description
 *
 * This directive makes sure that user inputs their full name in the right format
*/
.directive('fullname' , function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope , elem , attrs , ngModel) {
      ngModel.$validators.fullname = function(modelValue) {
        if(modelValue) {
          var spaces  = function(){
            var count =0;
            for(var i=0; i<modelValue.length; i++) {
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

/**
 * @description
 *
 * This directive makes sure that the phone number of the user is formatted correctly
*/
.directive('phone' , function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope , elem , attrs , ngModel) {
      ngModel.$validators.phone = function(modelValue) {
        if(modelValue) {
          return modelValue.length == 11 && /^[0-9]+$/.test(modelValue);
        }
        else {
          return false;
        }
      }
    }
  }
})

/**
 * @description
 *
 * This directive makes sure that the username of the user is formatted correctly
*/
.directive('username' , function() {
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
});
