/**
 * @description
 *
 * This module tests the basic components of the application
*/

var request = require('supertest');
var assert = require('chai').assert;

describe('Tests for #server.js' , function() {

  //
  var app;
  var server;
  var database;

  beforeEach(function(done) {
    app = require('../app');
    app.serverFactory(4000 , function(server_instance , database_instance){

      //Instances of components to test
      database = database_instance;
      server = server_instance;

      //Delete testuser from the database
      var userObj = {username:'testuser@gmail.com'};
      request(server)
        .post('/auth/remove')
        .send(userObj)
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route '+err);
          }
          else {
            console.log('here 3' , res.body);
            return done();
          }
        });

    });
  });

  //
  afterEach(function(done) {
    server.close(done);
  });

  //
  describe('Tests for /auth route' , function() {
    it('should create and return a new user when i call auth/signup with a user object' , function(done) {
      //userObj to use for test
      var userObj = {username:'testuser@gmail.com' , password:'234567'};

      request(server)
        .post('/auth/signup')
        .send(userObj)
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route '+err);
          }
          else {
            console.log('here' , res.body);
            assert.equal(res.body.username , userObj.username);
            assert.isDefined(res.body._id);
            return done();
          }
        });
    });

    it('should return a user object when i call /auth/login with an auth object' , function(done) {
      //userObj to use for test
      var userObj = {username:'testuser@gmail.com' , password:'234567'};
      request(server)
        .post('/auth/signup')
        .send(userObj)
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route '+err);
          }
          else {
            request(server)
              .post('/auth/login')
              .send(userObj)
              .expect(200)
              .end(function(err , res){
                if(err) {
                  throw new Error('Error occoured on this route '+err);
                }
                else {
                  assert.equal(res.body.username , userObj.username);
                  return done();
                }
              });
          }
        });

    });

    it('should end the user session when i call /auth/logout' , function(done) {
      request(server)
        .get('/auth/logout')
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route '+err);
          }
          else {
            return done();
          }
        });
    });
  });

  //NOTE: As long as the above test passes, database connection is validated
  //Test should be centered around adding of collection to the data {}
  describe('Tests for database functionality' , function() {
    it('should connect correctly to the database' , function(done){
      database.initColls(['test'] , function(err) {
        assert.equal(null , err);
        return done();
      });
    });

    it('should return -1 when an invalid model is requested' , function(){
      assert.equal(database.model('invalid_collection') , -1);
    });

    it('should return the model object when a valid model is requested' , function(done){
      database.initColls(['Users'] , function(err) {
        assert.isObject(database.model('Users'));
        return done();
      });
    });
  });

})
