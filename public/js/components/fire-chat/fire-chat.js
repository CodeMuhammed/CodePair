/**
 *Handles the instance of chat that syncs to firebase //{}[]
*/

angular.module('chatComponent' , [])

//
.directive('fireChat' , function(){
    return{
       link:function(scope , elem , attrs){
           //@TODO add attrs here
           //scope.destination = attrs.destination;
       },
       templateUrl:'js/components/fire-chat/fire-chat.html',
       controller: 'aceController'
    };
});
