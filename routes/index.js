var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var validator = require("email-validator");


//var authentication = require('express-authentication');


mongoose.Promise = global.Promise;

var was = require('./../libs/wasSchema');
//var db = mongoose.createConnection('mongodb://localhost:27017/', 'test');



//Calling dataBase
var db = mongoose.createConnection('mongodb://localhost:27017/test');



// Starting page  loading
router.get('/', function(req, res, next) {
    if (!req.session.admin) {
        req.session.admin = false;
    }

    console.log("FirstPage:" + req.session.admin);
    var video_Data;

    was.find({ "wasType": "video" }).sort({ _id: -1 }).limit(5).exec(function(err, videoDocs) {

        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            video_Data = videoDocs;
            was.find({ "wasType": "audio" }).sort({ _id: -1 }).limit(5).exec(function(err, docs) {
                if (err) {
                    res.json(err)
                    mongoose.connection.close();
                } else {

                    res.render('index', { data: docs, videoData: video_Data, userInfo: req.session.admin });
                }

            });

        }

    });


    //var audioData;



});





//Search Data using the user ID

router.get('/content_id/:id', function(req, res, next) {

    was.findOne({ "_id": req.params.id }, function(err, docs) {
        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            // res.render('index', {data: docs});
            res.json(docs);
            if (docs == null) {
                console.log("NO data available with this ID");
            }
        }


    });

});


// Search Data using the speacher name

router.get('/speaker/:name', function(req, res, next) {

    var video_Data;

    was.find({ "name": req.params.name, "wasType": "video" }).sort({ _id: -1 }).limit(5).exec(function(err, videoDocs) {

        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            video_Data = videoDocs;

            was.find({ "name": req.params.name, "wasType": "audio" }).sort({ _id: -1 }).limit(5).exec(function(err, docs) {
                if (err) {
                    res.json(err);
                    mongoose.connection.close();
                } else {
                    if (video_Data == null && docs == null)

                    {
                        res.json("Data does not exist");
                    } else {
                        res.render('index', { "data": docs, "videoData": video_Data, "userInfo": req.session.admin });

                    }

                }

            });


        }
    });


    //var audioData;



});







// Search all audio data.

router.get('/audio', function(req, res, next) {
    console.log("AudioSession:" + req.session.admin);


    //set current page if specifed as get variable (eg: /?page=2)
    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    was.paginate({ "wasType": "audio" }, { page: currentPage, limit: 5 }, function(err, result) {

        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {


            res.render("audio", {
                data: result.docs,

                pageSize: result.limit,
                totalAudioData: result.total,
                pageCount: result.pages,
                currentPage: currentPage,
                userInfo: req.session.admin
            });

        }

    });

});





// Search audio data using the speaker name

router.get('/audioBySpeaker/speaker/:name', function(req, res, next) {

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ 'name': name, 'wasType': "audio" }, { page: currentPage, limit: 2 }, function(err, result) {
        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {


            res.render("audioBySpeaker", {
                data: result.docs,

                pageSize: result.limit,
                totalAudioData: result.total,
                pageCount: result.pages,
                currentPage: currentPage,
                speakerName: name,
                userInfo: req.session.admin
            });

        }



    });

});



//Vide: Search all video data
router.get('/videoWas', function(req, res, next) {
    console.log("VideoPage:" + req.session.admin);

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ "wasType": "video" }, { page: currentPage, limit: 5 }, function(err, result) {
        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            res.render('videoWas', {
                data: result.docs,
                pageSize: result.limit,
                totalVideoData: result.total,
                pageCount: result.pages,
                currentPage: currentPage,
                userInfo: req.session.admin
            });

            // res.json(docs);

        }

    });

});




// Search Vide data using the speaker name

router.get('/videoBySpeaker/speaker/:name', function(req, res, next) {

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ 'name': name, 'wasType': "video" }, { page: currentPage, limit: 3 }, function(err, result) {
        if (err) {
            res.json(err)
            mongoose.connection.close();
        } else {

            res.render('videoBySpeaker', {
                data: result.docs,
                pageSize: result.limit,
                totalAudioData: result.total,
                pageCount: result.pages,
                currentPage: currentPage,
                speakerName: name,
                userInfo: req.session.admin
            });

        }


    });

});



// Contact page load

router.get('/contact', function(req, res, next) {

    console.log("contagePage:" + req.session.admin);
    res.render("contact", { userInfo: req.session.admin });

});


router.post('/contact', function(req, res, next) {

    console.log("contagePage:" + req.session.admin);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'motiur.mbstu@gmail.com', // Your email id
            pass: 'cvifcxpetookuwts' // Your password
        }
    });

    var name = req.body.name;
    var Email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    var mailOptions = {
        from: 'motiur.mbstu@gmail.com', // sender address
        to: Email, // list of receivers
        subject: subject, // Subject line
        text: name +'\n'+message //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    if (Email != "" && subject != "" && message !== "") {
        validator.validate_async(Email, function(err, isValidEmail) {

            if (isValidEmail) {
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        res.json("Please try again");
                    } else {
                        console.log('Message sent: ' + info.response);
                        //res.json({yo: info.response});

                        res.redirect("/contact");

                    };
                });
            } else {
                res.json("Please provide valid email");

            }


        }); // true 

    } else {
        res.json("Please fill up fields");
    }




});





//About page Calling

router.get('/blog', function(req, res, next) {

    console.log("blogPage:" + req.session.admin);
    res.render('blog', { "userInfo": req.session.admin });


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
