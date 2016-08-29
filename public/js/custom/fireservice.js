/**
 *This module exposes a firebase service that allow you to persist and listen for realtime updates
 *On specific routes //{}[]
 */
angular.module('fireserviceModule' , [])

/**
 *This function returns an object that a contains the API for interacting with firebase
 */
.factory('fireservice' , function($q) {

    //instance variables to store refrences to our different collections on firebase
    var database;
    var snippetRef;
    var chatRef;
    var membersRef;
    var codePairsRef;

    //==================================================================================//
    //=============================FIREBASE INITIALIZATION==============================//
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


    //=========================CODEPAIR RESTAPI DEINITION HERE==========================//
    //==================================================================================//

    //This function pushes a new codePair to the codePairs collection for a given user
    function createCodePair(newCodePair) {
       codePairsRef.push(newCodePair);
    };

    //This function synchronizes with codePairs collection on firebase
    function syncCodePairs(id , notify) {
       id = id.replace(/[^a-zA-Z0-9]/g,'');
       console.log(id);
       codePairsRef = database.ref ('codePairs/'+id);

       //Listens for when the data changes
       codePairsRef.on('value', function(snapshot) {
         console.log('Value here');
         notify(snapshot.val());
       });
    };

    //This function returns a sinngle codePair from firebase
    function getCodePair(ref , done) {
      database.ref ('codePairs/'+ref).once('value').then(
        function(snapshot) {
         done(snapshot.val());
        }
       );

    }

    //This function updates a speciic codePair on the database
    function updateCodePair(ref , codePair) {
       //updateCodePair on firebase
       codePairsRef.child('/'+ref).update(codePair);
    };

    //This function deletes a specific codePair
    function removeCodePair(ref) {
        //remove code pair at this specific ref
        codePairsRef.child('/'+ref).set(null);
    }


    //=========================CODE SNIPPET COLLECTION ENDPOINT==========================//
    //==================================================================================//
    //This function takes in a snippet id and synchronizes the data with this connected client

    //This function creates a new snippet on firebase and return the id
    function newSnippet() {
      return database.ref('codeSnippets/').push().key;
    }

    //=============================CHAT SYNC ENDPOINT===================================//
    //==================================================================================//
    //This function takes a chat id and synchronizes the data with this connected users //{}
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


    //=========================ACTIVE MEMBERS SYNCHRONIZATION==========================//
    //==================================================================================//
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
       //registers a member on firebase
       //Makes the section of the username before the @ a unique identifier for this user
       if(member) {
         var substr = member.username.substr(0 , member.username.indexOf('@'));
         substr = substr.replace(/[^a-zA-Z0-9]/g,'');
         membersRef.child('/'+substr).update(member);
       }
    }

    //This function returns the reference to the homepage editor
    function getPadRef(id) {
      if(id) {
        return database.ref ('codeSnippets/'+id);
      }
    }


    //Methods exposed by this factory
    return {
       createCodePair:createCodePair,
       syncCodePairs:syncCodePairs,
       getCodePair:getCodePair,
       updateCodePair:updateCodePair,
       removeCodePair:removeCodePair,
       syncChat: syncChat,
       postChat: postChat,
       newSnippet:newSnippet,
       syncMembers:syncMembers,
       registerMember:registerMember,
       getPadRef : getPadRef
    };

});
