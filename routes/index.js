var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

    
   
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
    // var data = [];
    // for (var i = Things.length - 1; i >= 0; i--) {
    //   Things[i]
    // }
  	 res.render('index', {data: docs});
  
  }
  
});

 });

router.get('/about', function(req, res, next) {
 

  res.render('about');


 });




router.get('/api/data/:id', function(req, res, next) {
 

 was.findOne({"_id":req.params.id}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
    
    // res.render('index', {data: docs});
     res.json(docs);
     if(docs==null)
     {
      console.log("NO data available with this ID");
     }
   }


 });

});

router.get('/contact', function(req, res, next) {
 

res.render("contact");

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
