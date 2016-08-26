/**
 * @description
 *
 * This module holds useful utility services and constants that might be used through the application
*/
angular.module('generalServices' , [])

//This is a list of programming languages users can select from whe setting up a code session
//Or when typing on ace editor
.value('languages' , [
  'Java' , 'C++' , 'C' , 'Python' , 'JavaScript' , 'Ruby' , 'PHP',
  'Objective C' , 'C#' , 'Go' , 'Perl' , 'Scala' , 'CoffeScript' , 'Clojure',
  'Haskell' , 'Erlang', 'scheme' , 'xml' ,  'text'
]);
