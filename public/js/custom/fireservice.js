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
    var membersRef;


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDUcyEv74Ft4VOK7gQFWSl6OpW0mFFKbRI",
      authDomain: "megg-a35eb.firebaseapp.com",
      databaseURL: "https://megg-a35eb.firebaseio.com",
      storageBucket: "megg-a35eb.appspot.com",
    };

    firebase.initializeApp(config);

    // Get a reference to the database service
    database = firebase.database();

    //This function takes in a snippet id and synchronizes the data with this connected client
    function syncSnippet(id , notify) {
      snippetRef = database.ref ('codeSnippets/'+id);

      //Listens for when the data changes
      snippetRef.on('value', function(snapshot) {
        console.log('Value here');
        notify(snapshot.val());
      });
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
    function syncChat(id , notify) {
      chatRef = database.ref ('chats/'+id);

      //Listens for when the data changes
      chatRef.on('value', function(snapshot) {
        console.log(snapshot.val());
        notify(snapshot.val());
      });
    }

    //This function takes care of posting chat to the timeline
    function postChat(newPost) {
      console.log(newPost);
      chatRef.push(newPost);
    }


    //This function takes a chat id and synchronizes the data with this connected users //{}[]
    function syncMembers(id , notify) {
      membersRef = database.ref ('members/'+id);

      //Listens for when the data changes
      membersRef.on('value', function(snapshot) {
         console.log(snapshot.val());
         notify(snapshot.val());
      });
    }

    //This function registers a new members as they join the session
    function registerMember(member) {
       //Make the full name of the user the id for his path
       membersRef.child('/'+member.fullname.split(' ').join('')).update(member);
    }



    //Methods exposed by this factory
    return {
       syncSnippet: syncSnippet,
       syncChat: syncChat,
       postChat: postChat,
       updateSnippet: updateSnippet,
       newSnippet:newSnippet,
       syncMembers:syncMembers,
       registerMember:registerMember
    };

});
