 //Require dependencies
 //{}[]
var express = require('express');
var router = express.Router();

/**
 * authentication layer of the application
 * @param {object} passport - instance of passport authenticatio strategy
 * @return {object} Public_APIs
*/
module.exports = function(passport){

  /**
   * All requests to the server are intercepted by this function
   * @param {object} options - contains configurations of how to use the returned middleware
   * @return {object} middleware that express uses
  */
   var authorize = function(options){
      if(options){
          Array.isArray(options.except) ? '' : options.except = [];
      }
      else{
         options = {except:[]};
      }
      return function(req , res , next){
           if(req.isAuthenticated() || options.except.indexOf(req.method)>=0 ){
               console.log('User authorized');
               next();
           }
           else{
              res.status(500).send('User is not authorized');
           }
      }
   }

   //This route handles the signup flow
   router.post('/signup' , passport.authenticate('signup') , function(req , res){
     res.status(200).send(req.user);
   });

   //This route handles the login flow
   router.post('/login' , passport.authenticate('login') , function(req , res){
     res.status(200).send(req.user);
   });

   //This route handles the logout flow
	 router.get('/logout' , function(req, res){
		   req.logout();
		   res.status(200).send('Logged out successfully');
	 });

   //Public facing APIs
	 return {
      router:router,
      authorize : authorize
   };
};
