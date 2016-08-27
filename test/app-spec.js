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

      return done();
    });
  });

  //
  afterEach(function(done) {
    server.close(done);
  });

  //
  describe('Tests for /auth route' , function() {
    it('should create and return a new user when i call auth/signup with a user object');
    it('should return a user when i call /auth/login with an auth object');
    it('should return a message when i call /auth/logout ');
  });

  //NOTE: As long as the above test passes, database connection is validated
  //Test should be centered around adding of collection to the data {}[]
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

    it('should return the model object when a valid model is requested' , function(){
      database.initColls(['test'] , function(err) {
        assert.equal(null , err);
        assert.isObject(database.model('test'));
        return done();
      });
    });

  });

})
