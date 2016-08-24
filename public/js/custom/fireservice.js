/**
 *This module exposes a firebase service that allow you to persist and listen for realtime updates
 *On specific routes //{}[]
 */
angular.module('fireserviceModule' , [])

/**
 *This function returns an object that a contains the API for interacting with firebase
 */
.factory('fireservice' , function($q) {
    //instance variables
    var database;
    var snippetRef;
    var chatRef;


    // Initialize Firebase
    (function() {
      var config = {
        apiKey: "AIzaSyDUcyEv74Ft4VOK7gQFWSl6OpW0mFFKbRI",
        authDomain: "megg-a35eb.firebaseapp.com",
        databaseURL: "https://megg-a35eb.firebaseio.com",
        storageBucket: "megg-a35eb.appspot.com",
      };

      firebase.initializeApp(config);

      // Get a reference to the database service
      database = firebase.database();
    })();

    //This function takes in a snippet id and synchronizes the data with this connected client
    //
    function syncSnippet(id) {
      var promise = $q.defer();

      snippetRef = database.ref ('codeSnippets/'+id);

      //Listens for when the data changes
      snippetRef.on('value', function(snapshot) {
        promise.notify(snapshot.val());
      });

      return promise.promise;
    }

    //This function updates the code snippet with updated value from the scope //{}[]
    function updateSnippet(value) {
      snippetRef.set(value);
    }

    //This function creates a new snippet on firebase and return the id
    function newSnippet() {
      return database.ref('codeSnippets/').push().key;
    }


    //This function takes a chat id and synchronizes the data with this connected users //{}[]
    function syncChat(id) {
      var promise = $q.defer();

      chatRef = database.ref ('chats/'+id);

      //Listens for when the data changes
      chatRef.on('value', function(snapshot) {
        console.log(snapshot.val()+'  here');
        promise.notify(snapshot.val());
      });

      return promise.promise;
    }

    //Methods exposed by this factory
    return {
       syncSnippet: syncSnippet,
       syncChat: syncChat,
       updateSnippet: updateSnippet,
       newSnippet:newSnippet
    };

});
