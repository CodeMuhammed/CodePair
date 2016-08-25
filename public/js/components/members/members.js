/**
 * Module to hold the functionality of members list  //{}[]
*/
angular.module('membersComponent' , [])

/**
 * A template-directive for members
*/
.directive('members' , function(){
    return{
       link:function(scope , elem , attrs){
           console.log(attrs);
           scope.membersRef = attrs['members-ref'];
       },
       templateUrl:'js/components/members/members.html',
       controller: 'membersController'
    };
})

/**
 * Controller that takes care of the functionality of the component
*/
.controller('membersController' , function($scope) {

});
