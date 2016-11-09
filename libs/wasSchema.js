var mongoose = require('mongoose');

  //mongoose.Promise = global.Promise;

  //var was = require('./../libs/wasSchema');

  //var was = mongoose.model('moti')
   
 //mongoose.connect('mongodb://localhost:27017/test'); 


 var wasData =  new mongoose.Schema({
     name: String,
     title:String,
     wasType: String,
     url: String
    });



 module.exports = mongoose.model('motis', wasData);