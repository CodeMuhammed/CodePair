//{}[]
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

  describe('Tests for /users route' , function() {

    /*it('responds with the messsage 1 for GET && query param id == 1' , function(done) {
      request(server)
        .get('/users?id=1')
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route');
          }
          else {
            assert.equal(res.body.msg, 1);
            return done();
          }
        });
    });

    it('responds with the messsage "no_id" for GET && query param id == undefined || null || ""' , function(done) {
      request(server)
        .get('/users')
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route');
          }
          else {
            assert.isTrue(Array.isArray(res.body.msg));
            return done();
          }
        });
    });

    it('responds with the data property in the object with POST' , function(done) {
      request(server)
        .post('/users')
        .send({data:'Muhammed'})
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route');
          }
          else {
            assert.equal(res.body.msg, 'Muhammed');
            return done();
          }
        });
    });

    it('responds with the data property in the object with PUT' , function(done) {
      request(server)
        .put('/users')
        .send({data:'Muhammed'})
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route');
          }
          else {
            assert.equal(res.body.msg, 'Muhammed');
            return done();
          }
        });
    });

    it('responds with "ok" with DELETE' , function(done) {
      request(server)
        .delete('/users')
        .send({data:'Muhammed'})
        .expect(200)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route');
          }
          else {
            assert.equal(res.body.msg, 'ok');
            return done();
          }
        });
    });

    it('responds with 404 for everything else'  , function(done) {
      request(server)
        .get('/route')
        .expect(404)
        .end(function(err , res){
          if(err) {
            throw new Error('Error occoured on this route');
          }
          else {
            assert.typeOf(res.body, 'object');
            return done();
          }
        });
    });
  });*/

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

  })

});

//{}
