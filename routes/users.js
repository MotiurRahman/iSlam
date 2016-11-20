var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
  res.render('admin/login');
});


//mongoose.createConnection('mongodb://localhost:27017/test');

// // create a schema
// var productSchema = new mongoose.Schema({
//   name: String,
//   url:String,
//   title:String
// });

// // the schema is useless so far
// // we needsto create a model using it
// var Was = restful.model('was', productSchema);

// Was.methods(['get','put','post','delete']);

// Was.register(router, '/');

// router.get('/', function(req, res, next) {
//   //res.send('respond with a resource');

// mongoose.connect(url, function(error) {
//   if(error)
// 		return res.status(500).json({
// 			message:"check your connection"
// 		})

// 	return res.status(500).json({
//                   message: "Mongooses successfully connected"
//                 });
// });

// });



// router.post('/save',function(rew,res,next){
// 			//res.send('respond with a resource');

// 			var newUser = User({
// 			  name: 'Abdur Raxxak',
// 			  url: 'www.motiur.com',
// 			  title: "mongoose"
// 			});

// 			// save the user
// 			newUser.insert(function(err,success) {
// 			  if (err) throw err;

// 			  //console.log('User created!');

// 			  return res.status(500).json({
// 			                  message: success
// 			                });
//                 });
// });


// router.get('/audioTest', function(req, res, next) {
//   console.log("AudioSession:"+req.session.admin);
  
//   was.find({"wasType":"audio"}, function (err, docs) {
  
//   if(err)
//   {
//           res.json(err)
//           mongoose.connection.close();
//   }
//   else {

//    res.render("audio", {data:docs, userInfo:req.session.admin});
//     }
  
// });

// });



module.exports = router;
