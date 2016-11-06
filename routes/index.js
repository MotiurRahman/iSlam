var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var authentication = require('express-authentication');
    
   
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
  console.log("FirstPage:"+req.session.userInfo);
  //req.session.userInfo = false;



  was.find({}, function (err, docs) {
  if(err)
  {
  	res.json(err)
          mongoose.connection.close();
  }
  else
  {
  
    res.render('index', {"userInfo":req.session.userInfo, "data" :docs});
 
     
  	 
  }
  
});

 });

router.get('/about', function(req, res, next) {
 
console.log("aboutPage:"+req.session.userInfo);
res.render('about', {"userInfo":req.session.userInfo});


 });





router.get('/content_id/:id', function(req, res, next) {
 
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


router.get('/speaker/:name', function(req, res, next) {
 
 was.find({"name":req.params.name}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
    
     res.render('index', {data: docs});
     //res.json(docs);
    
     
   }


 });

});

router.get('/contact', function(req, res, next) {
 
console.log("contagePage:"+req.session.userInfo);
 res.render("contact", {"userInfo":req.session.userInfo});

});

router.get('/audio', function(req, res, next) {
 
//console.log("sessionDataAudio:"+req.session.id);
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
     
     res.render('audio', {"data" :docs, "userInfo":req.session.userInfo});
  
  }
  
});


});
router.get('/video', function(req, res, next) {
 console.log("VideoPage:"+req.session.userInfo);

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
     
     res.render('video', {"data" :docs, "userInfo":req.session.userInfo});
  
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
