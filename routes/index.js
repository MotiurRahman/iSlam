var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var authentication = require('express-authentication');
    
   
 mongoose.Promise = global.Promise;
   

   var was = require('./../libs/wasSchema');
  //var db = mongoose.createConnection('mongodb://localhost:27017/', 'test');

//Calling dataBase
var db = mongoose.createConnection('mongodb://localhost:27017/test'); 



// Starting page  loading
router.get('/', function(req, res, next) {
  //var data;
  console.log("FirstPage:"+ req.session.userInfo);
  //req.session.userInfo = false;

  was.find({}, function (err, docs) {
  if(err)
  {
  	res.json(err)
          mongoose.connection.close();

  }
  else
  {

    res.render('index', {data:docs, userInfo:req.session.userInfo});
  	 
  }
  
});

 });



//Search Data using the user ID

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


// Search Data using the speacher name

router.get('/speaker/:name', function(req, res, next) {
 
 was.find({"name":req.params.name}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
    
     res.render('index', {data:docs, userInfo:req.session.userInfo});
     //res.json(docs);     
   }


 });

});







// Search all audio data.

router.get('/audio', function(req, res, next) {
 
console.log("AudioSession:"+req.session.userInfo);
  was.find({"wasType":"audio"}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
     
     res.render('audio', {data:docs, userInfo:req.session.userInfo});
  
  }
  
});

});





// Search audio data using the speaker name

router.get('/audio/speaker/:name', function(req, res, next) {
 
 was.find({'name':req.params.name, 'wasType':"audio"}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
    
     res.render('audio', {data:docs, userInfo:req.session.userInfo});
     //res.json(docs);
    
     
   }


 });

});



//Vide: Search all video data
router.get('/videoWas', function(req, res, next) {
 console.log("VideoPage:"+req.session.userInfo);

  was.find({"wasType":"video"}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
  
    res.render('videoWas', {data :docs, userInfo :req.session.userInfo});

    // res.json(docs);
  
  }
  
});

});




// Search Vide data using the speaker name

router.get('/videoWas/speaker/:name', function(req, res, next) {
 
 was.find({'name':req.params.name, 'wasType':"video"}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
    
    res.render('videoWas', {data:docs, userInfo:req.session.userInfo});
    //res.json(docs);
    
     
   }


 });

});



// Contact page load

router.get('/contact', function(req, res, next) {
 
console.log("contagePage:"+req.session.userInfo);
 res.render("contact", {userInfo:req.session.userInfo});

});





//About page Calling

router.get('/about', function(req, res, next) {
 
console.log("aboutPage:"+req.session.userInfo);
res.render('about', {"userInfo":req.session.userInfo});


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
