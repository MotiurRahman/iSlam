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
  if(!req.session.admin)
  {
    req.session.admin = false;
  }
  
   console.log("FirstPage:"+ req.session.admin);
   var video_Data;

  was.find({"wasType":"video"}).sort({_id:-1}).limit(5).exec(function(err,videoDocs){

  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else {
  
    video_Data = videoDocs;
  }
  
  });
  

//var audioData;
was.find({"wasType":"audio"}).sort({_id:-1}).limit(5).exec(function(err,docs){
if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else {
     
     res.render('index', {data:docs, videoData: video_Data, userInfo:req.session.admin});
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

  var video_Data;

  was.find({"name":req.params.name, "wasType":"video"}).sort({_id:-1}).limit(5).exec(function(err,videoDocs){

  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else
  {
  
    video_Data = videoDocs;

  
  }
  });
  

//var audioData;
was.find({"name":req.params.name, "wasType":"audio"}).sort({_id:-1}).limit(5).exec(function(err,docs){
if(err)
  {
          res.json(err);
          mongoose.connection.close();
  }
  else
  {
    if(video_Data==null&&docs==null)

     {
      res.json("Data does not exist");
     }else{
      res.render('index', {data:docs, videoData: video_Data, userInfo:req.session.admin});
  
     }
     
  }
  
  });
  

});







// Search all audio data.

router.get('/audio', function(req, res, next) {
  //console.log("AudioSession:"+req.session.admin);
  
  was.find({"wasType":"audio"}, function (err, docs) {
  
  if(err)
  {
          res.json(err)
          mongoose.connection.close();
  }
  else {
      res.render("audio", {data:docs, userInfo:req.session.admin});
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
  else {
    
     res.render("audio", {data:docs, userInfo:req.session.admin});
     //res.json(docs);
    }


 });

});



//Vide: Search all video data
router.get('/videoWas', function(req, res, next) {
 console.log("VideoPage:"+req.session.admin);

  was.find({"wasType":"video"}, function (err, docs) {
  if(err)
  {
    res.json(err)
          mongoose.connection.close();
  }
  else {
  
    res.render('videoWas', {data :docs, userInfo :req.session.admin});

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
  else {
    
    res.render('videoWas', {data:docs, userInfo:req.session.admin});
    //res.json(docs);
     }


 });

});



// Contact page load

router.get('/contact', function(req, res, next) {
 
console.log("contagePage:"+req.session.admin);
 res.render("contact", {userInfo:req.session.admin});

});





//About page Calling

router.get('/about', function(req, res, next) {
 
console.log("aboutPage:"+req.session.admin);
res.render('about', {"userInfo":req.session.admin});


 });



router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');

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

// router.get('*', function(req, res){
//   res.send('what???', 404);
// });


module.exports = router;
