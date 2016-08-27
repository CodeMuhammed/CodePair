/**
 * @description
 *
 * A simple express server
*/
var express  = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var mongodb = require('mongodb');
var compression = require('compression');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var path = require('path');
var passport  = require('passport');

//Configure the express app
var app = express();

app.set('view cache' , true);
app.set('views' , 'views');
app.set('view engine' , 'ejs');
app.set('port' , process.env.PORT || 3002)

app.use(bodyParser.json());
app.use(compression({threshold:1}));
app.use(methodOverride('_method'));
app.use(favicon(path.join(__dirname , 'public', 'favicon.ico')));

/**
 *A factory function that creates and returns a server instance on demand
 *This enhances testability
 *@return {object} server_instance an instance of the server running the  app
 *@return {object} database an instance of the database conected to
 *@return {object} auth authorization instance
 *@return {object} passport localStrategy instance
*/
function makeServer(port , done){
  var server_instance = app.listen(port , function () {
    console.log('server running on port %s' , port);
  });

  //Configure and connect to database {}[]
  //set the model source
  var database = require('./model/database')('CodePair', app);

  //initialize database
  database.initColls(['Users'] , function(err){
    if(err) {
      throw new Error('error connecting to database' , err);
    }

    console.log('Collections initialized');

    //configure express static
    app.use(express.static(path.join(__dirname , 'public')));

    //Initializing passport local strategy
    var localStrategy  = require('./controllers/passportCtrl')(passport , database);

    //Auth module
    var Auth =  require('./routes/auth')(localStrategy);

    //
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(session({resave:true , secret:'taskcoin' , saveUninitialized:true}));

    //start passport
    app.use(localStrategy.initialize());
    app.use(localStrategy.session());

    //loads routes
    app.use('/auth' , Auth.router);

    //Returns at the end of this function
    return done(server_instance , database);
  });
}

/**
 *Init the server
*/
makeServer(app.get('port') , function(/**/){
  //@NOTE you may use the instance here
});

//Exports module functionality here
module.exports = {
  serverFactory : makeServer
};
