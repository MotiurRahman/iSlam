var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

var was = require('./../libs/wasSchema');


//Calling dataBase
var db = mongoose.createConnection('mongodb://localhost:27017/test');


router.get('/speakerName', function(req, res, next) {
    if (!req.session.admin) {
        req.session.admin = false;
    }

    console.log("FirstPage:" + req.session.admin);
    var video_Data;

    was.find().distinct("name").exec(function(err, result) {

        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            res.json(result);

        }

    });


});



router.get('/audioBySpeaker/speaker/:name/:page', function(req, res, next) {
//আব্দুর%20রায্‌যাক%20বিন%20ইউসুফ
    
    
    var currentPage = req.params.page
    var name = req.params.name;
    

    was.paginate({ 'name': name, 'wasType': "audio" }, { page: currentPage, limit: 15}, function(err, result) {
        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {


            res.json(result);

        }



    });


});


router.get('/videoBySpeaker/speaker/:name/:page', function(req, res, next) {

    var currentPage = req.params.page
    var name = req.params.name;
    

    was.paginate({ 'name': name, 'wasType': "video" }, { page: currentPage, limit: 15 }, function(err, result) {
        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            res.json(result.docs);

        }


    });

});




module.exports = router;