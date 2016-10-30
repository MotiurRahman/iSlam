var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var EJS = require('ejs');
    
   
 mongoose.Promise = global.Promise;
   

  var was = require('./../libs/wasSchema');
  //var db = mongoose.createConnection('mongodb://localhost:27017/', 'test');
   var db = mongoose.createConnection('mongodb://localhost:27017/test'); 



//var mongoose = require('mongoose');

//var mongoDB = require('./../libs/database');
//mongoose.createConnection('mongodb://localhost:27017/test'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  //var data;
 

  was.find({}, function (err, docs) {
  if(err)
  {
  	res.json(err)
          mongoose.connection.close();
  }
  else
  {
  	//console.log(docs);
  	//res.set('Content-Type', 'application/javascript');
  	 res.render('index', {data: docs});
  
  }
  
});

 });

//create a schema
// var productSchema = new mongoose.Schema({
//   name: String,
//   url:String,
//   title:String
// });

// // the schema is useless so far
// // we needsto create a model using it
// var Products = restful.model('products', productSchema);

// Products.methods(['get','put','post','delete']);

// Products.register(router, '/product');




module.exports = router;
