/**
 * @description
 *
 * This module holds the functionality of the member list a pair programming session
*/
angular.module('membersComponent' , [])

/**
 * A template-directive for members
*/
.directive('members' , function(){
  return{
    link:function(scope , elem , attrs){
      scope.ref = attrs.ref;
      scope.member = scope.$eval(attrs.member);
    },
    templateUrl:'js/components/members/members.html',
    controller: 'membersController'
  };
})

/**
 * Controller that takes care of the functionality of the component
*/
.controller('membersController' , function($scope, $timeout, fireservice) {
  $timeout(function() {
    //Listens for when membersList is updated on firebase
    fireservice.syncMembers($scope.ref , function(membersList) {
      if(angular.isDefined(membersList)) {
        $scope.membersList = [];
        angular.forEach(membersList , function(val ,key) {
          $scope.membersList.push(val);
        });
      }
    });

    //Register this member on memberlist on firebase
    fireservice.registerMember($scope.member);
  });
});
