/*!
 * testapi {}[]
 */

var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();


module.exports = function(database) {

  //Get the user model for use in this route
  var Users = database.model('Users');

  router.route('/')
     //Gets resources from this api that matches the id property
     //In the query string
    .get(function(req , res) {
      var id = isNaN(req.query.id) ? [] : req.query.id;
      res.status(200).send({msg:id});
    })

     //Post a resource to this api
    .post(function(req , res) {
       console.log(req.body);
       req.body._id = ObjectId(req.body._id);
       //Save userData to the database
       Users.update({_id: req.body._id} , req.body , function(err, stats) {
          if(err) {
            console.log(err);
            res.status(500).send('Database connection error');
          }
          else {
            res.status(200).send('post gotton on the server');
          }
       });
    })

    //Update a resource to this api;
    .put(function(req , res) {
      res.status(200).send({msg:req.body.data});
    })

    //Deletes a resource from this endpoint that matches id property
    //In the query string
    .delete(function(req , res) {
      res.status(200).send({msg:'ok'});
    });

  //
  return router;
};
