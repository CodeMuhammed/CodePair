//Require dependencies
var MongoClient  = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

/**
 * Database module handling connection and creation of models
 * @param {string} dbName - name of the database to connect to
 * @param {object} app - the express app it self
 * @return {object} Public_APIs
*/
module.exports = function(dbName , app){

	//
	var DBOpened = false;
	var openedColls = {};

	//Set db connection string based on the current environment being worked in...
	var url = app.get('env') ==='development' ? 'mongodb://127.0.0.1:27017/'+dbName : 'mongodb://<dbuser>:<dbpassword>@ds011705.mlab.com:11705/minicards';

	/**
	 * Connects to the database
	 * @param {array} collsArr - an array of collection names string
	 * @param {function} cb - name of the function to be excecuted when setup is done
	 * @return;
	*/

	//This functions accesses the database and creates a pool of opened
	//connections to the required collections needed by the app
	var initColls = function (collsArr , cb) {
		if(!isDBOpened()){
			MongoClient.connect(url , function(err , db){
				if(err){
					return cb(err);
				}
				else {
					console.log('Connected correcctly to the database');

					//
					for(var i=0; i<collsArr.length; i++){
						openedColls[collsArr[i]] = db.collection(collsArr[i]);
					}

					DBOpened = true;
					return cb(null);
				}
			});
		}
		else {
			return cb();
		}
	};

	/**
	 * This function returns a valid collection to the client module
	 * @param {string} coll collection name
	 * @return {object} actual_collection
	 */
	var model = function(coll){
		if(!openedColls[coll]){
			return -1;
		}
		return openedColls[coll];
	};

	//checks to see if the database is opened
	var isDBOpened = function(){
		return DBOpened;
	}

	//Public facing APIs
	return {
		initColls : initColls,
		model : model
	};
};
