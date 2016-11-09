var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var session = require('express-session');

  mongoose.Promise = global.Promise;

  var was = require('./../libs/wasSchema');


  //router.use(express.basicAuth('password'));

 var checkAuthentication =  function(req, res, next) {
  
  console.log("before:"+req.session.value);
     //req.session.value = false;
  if(req.session.value) {
     next();
  } else {
    res.redirect('/admin/login')
   
  }
}

//router.use(checkAuthentication);
   
 mongoose.connect('mongodb://localhost:27017/test');



router.get('/login', function(req, res, next) {
 
 res.render('admin/login', {userInfo:req.session.userInfo});

}).post('/login', function(req, res, next) {

  var password = req.body.password;
 
  if(password == "1")
  {

    req.session.value = true;
  // loginValue = true;ß
     req.session.userInfo = true;
   console.log("sessionInisde:"+req.session.userInfo);
    res.redirect('/admin/insert');
  } 
 
  else
  {
    req.session.value = false;
    req.session.userInfo = false;

    return res.status(401).json({
        message: "please insert right password"
      });
  }

});

router.get('/logout', function(req, res, next) {
 // var path = url.parse(req.url).pathname;

  //console.log(path);


  req.session.value = false;
  req.session.userInfo = false;
  res.render('admin/login', {userInfo:req.session.value});


 });



router.get('/insert', checkAuthentication, function(req, res, next) {
   console.log("InserPage:"+req.session.userInfo);
res.render('admin/insert', {userInfo:req.session.userInfo});

}).post('/insert', function(req, res, next) {

  var name = req.body.name;
  var title = req.body.title;
  var url = req.body.url;
  var was_Type = req.body.type;
  //console.log("wasType:"+wasType);

      var was_Data = {
        name:name,
        title:title,
        wasType:was_Type,
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

router.get('/delete', checkAuthentication, function(req, res, next) {
  console.log("DeletePage:"+req.session.userInfo);
res.render('admin/delete', {userInfo:req.session.userInfo});

}).post('/delete',function(req, res, next) {

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


router.get('/update', checkAuthentication, function(req, res, next) {
   console.log("Updatepage:"+req.session.userInfo);
res.render('admin/update', {userInfo:req.session.userInfo});
}).post('/update',function(req, res, next) {

//mongoose.createConnection('mongodb://localhost:27017/test'); 
var id = req.body.id;
 var name = req.body.name;
 var title = req.body.title;
 var url = req.body.url;
 var was_Type = req.body.type;
 console.log("was_Type:"+was_Type)

var conditions = { "_id": id }
  , update = { $set: {"name":name,"title":title,"wasType":was_Type,"url":url}}
  , options = { multi: true };

was.update(conditions, update, options, callback);

function callback (err, updatdata) {
  if (err) {
    res.json(error)
          mongoose.connection.close();
  }
  else{
    console.log(updatdata);
          res.redirect('/')
  }
};

});
 





module.exports = router;