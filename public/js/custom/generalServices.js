/**
 * @description
 *
 * This module holds useful utility services and constants that might be used through the application   //{}
*/
angular.module('generalServices' , [])

//This is a list of programming languages users can select from whe setting up a code session
//Or when typing on ace editor
.value('languages' , [
  'Java' , 'C++' , 'C' , 'Python' , 'JavaScript' , 'Ruby' , 'PHP',
  'Objective C' , 'C#' , 'Go' , 'Perl' , 'Scala' , 'CoffeScript' , 'Clojure',
  'Haskell' , 'Erlang', 'scheme' , 'xml' ,  'text'
])

//This service takes a long url and shortens it with goo.gl API
.factory('urlShortener' , function($http) {

  //This function takes in a string which is a long version of the url and returns the shortened version
  function shorten(longUrl , done) {
    $http({
      method : 'POST',
      url : 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCv7uZqmORCCXr1HQwnZRN0KGkRqhunIxw',
      data : {longUrl: longUrl}
    })
    .success(function(data){
      done(null , data.id);
    })
    .error(function(err){
      done(err , null);
    });
  }

  //Publicly accessible methods
  return {
    shorten : shorten
  }
});
