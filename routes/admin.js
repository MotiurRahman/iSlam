var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

  mongoose.Promise = global.Promise;

  var was = require('./../libs/wasSchema');

  //var was = mongoose.model('moti')
   
 mongoose.connect('mongodb://localhost:27017/test'); 


 // var wasData =  new mongoose.Schema({
 //     name: String,
 //     title:String,
 //     url: String
 //    });

 // var was  =  mongoose.model('moti', wasData);


router.get('/login', function(req, res, next) {
 res.render('admin/login');

});

router.get('/insert', function(req, res, next) {
res.render('admin/insert');

});

router.post('/login', function(req, res, next) {
  var pass = req.body.password;
  console.log(pass);

  if(pass == "1")
  {
res.redirect('/admin/insert')
  }
  else
  {
  	return res.status(401).json({
        message: "please insert right password"
      });
  }

});


router.post('/insert', function(req, res, next) {

  var name = req.body.name;
  var title = req.body.title;
  var url = req.body.url;

      var was_Data = {
        name:name,
        title:title,
        url:url
      };

      //res.json(was_Data)

      var new_Was = new was(was_Data);
      new_Was.save(function(error,data){

        if(error)
        {
          res.json(error)
          mongoose.connection.close();
        }else
        {
          //res.json(data)
          res.redirect('/')
        }

        
     });

         

   });

router.get('/delete', function(req, res, next) {
res.render('admin/delete');

});

router.post('/delete', function(req, res, next) {

//mongoose.createConnection('mongodb://localhost:27017/test'); 
var data = req.body.id;
console.log(data);
//res.json(data)
//http://mongoosejs.com/docs/api.html#query_Query-remove

  was.find({ "_id":data }).remove( function (error,success){

    if (error) {
      res.json(error)
          mongoose.connection.close();
        }else
        {
         console.log(success);
          res.redirect('/')
        }

   });

 
});


router.get('/update', function(req, res, next) {
res.render('admin/update');
});

router.post('/update', function(req, res, next) {

//mongoose.createConnection('mongodb://localhost:27017/test'); 
var id = req.body.id;
 var name = req.body.name;
 var title = req.body.title;
 var url = req.body.url;

var conditions = { "_id": id }
  , update = { $set: {"name":name,"title":title,"url":url}}
  , options = { multi: true };

was.update(conditions, update, options, callback);

function callback (err, numAffected) {
  if (err) {
    res.json(error)
          mongoose.connection.close();
  }
  else{
    console.log(numAffected);
          res.redirect('/')
  }
};

});
 





module.exports = router;