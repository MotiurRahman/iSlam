var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var validator = require("email-validator");


//var authentication = require('express-authentication');
var checkAuthentication = require('./../libs/autho');


var was = require('./../libs/wasSchema');
//var db = mongoose.createConnection('mongodb://localhost:27017/', 'test');

var book = require('./../libs/bookSchema');

//Calling dataBase
//var db = mongoose.createConnection('mongodb://localhost:27017/test');



// Starting page  loading
router.get('/', function(req, res, next) {
    if (!req.session.admin) {
        req.session.admin = false;
    }


    console.log("FirstPage:" + req.session.admin);
    var video_Data;

    was.find({ "wasType": "video", "lecture": "bangla" }).sort({ _id: -1 }).limit(5).exec(function(err, videoDocs) {

        if (err) {
            res.json(err)
        } else {

            video_Data = videoDocs;
            was.find({ "wasType": "audio", "lecture": "bangla" }).sort({ _id: -1 }).limit(5).exec(function(err, docs) {
                if (err) {
                    res.json(err)

                } else {

                    res.render('index', { data: docs, videoData: video_Data, userInfo: req.session.admin });
                }

            });

        }

    });


    //var audioData;



});





//Search Data using the user ID

router.get('/content_id/:id', checkAuthentication, function(req, res, next) {

    was.findOne({ "_id": req.params.id }, function(err, docs) {
        if (err) {
            return res.status(500).json({
                message: "Your Id is not valid"
            });
            //mongoose.connection.close();

        } else {

            // res.render('index', {data: docs});
            res.json(docs);

        }


    });

});


// Search Data using the speacher name

router.get('/speaker/:name', function(req, res, next) {

    var video_Data;

    was.find({ "name": req.params.name, "wasType": "video", "lecture": "bangla" }).sort({ _id: -1 }).limit(5).exec(function(err, videoDocs) {

        if (err) {
            res.json(err)

        } else {

            video_Data = videoDocs;

            was.find({ "name": req.params.name, "wasType": "audio", "lecture": "bangla" }).sort({ _id: -1 }).limit(5).exec(function(err, docs) {
                if (err) {
                    res.json(err);

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

    was.paginate({ "wasType": "audio", "lecture": "bangla" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {

        if (err) {
            res.json(err)

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

    was.paginate({ 'name': name, 'wasType': "audio", "lecture": "bangla" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

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

    was.paginate({ "wasType": "video", "lecture": "bangla" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

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

    was.paginate({ 'name': name, 'wasType': "video", "lecture": "bangla" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

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

}).post('/contact', function(req, res, next) {

    console.log("contagePage:" + req.session.admin);


    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'motiur.mbstu@gmail.com', // Your email id
            pass: 'cvifcxpetookuwts' // Your password
        }
    });

    //var transporter = nodemailer.createTransport('smtps://motiur.mbstu@gmail.com%40gmail.com:cvifcxpetookuwts@smtp.gmail.com');

    var name = req.body.name;
    var email = req.body.email;
    var Subject = req.body.subject;
    var message = req.body.message;

    console.log("Email:" + email);
    console.log("name:" + name);
    console.log("subject:" + Subject);
    //console.log("message"+message);


    var mailOptions = {
        from: email, // sender address
        to: 'motiur.mbstu@gmail.com', // list of receivers
        subject: Subject, // Subject line
        text: name + '\n' + message + '\n' + email //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    if (validator.validate(email)) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.json("Please try again");
            } else {
                console.log('Message sent: ' + info.response);
                res.json("Message has been send successfully");

                //res.redirect("/contact");

            };
        });


    } else {
        res.json("Please try again with valid email");
    }

});





//Books page Calling

router.get('/books', function(req, res, next) {

    console.log("books:" + req.session.admin);
    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    book.paginate({}, { page: currentPage, limit: 3, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

        } else {

            res.render('books', {
                books: result.docs,
                pageSize: result.limit,
                totalAudioData: result.total,
                pageCount: result.pages,
                currentPage: currentPage,
                userInfo: req.session.admin
            });

        }


    });


});

//English was

router.get('/english', function(req, res, next) {

    console.log("english:" + req.session.admin);

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ "wasType": "video", "lecture": "english" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

        } else {

            res.render('english', {

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


router.get('/englishVideoBySpeaker/speaker/:name', function(req, res, next) {

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ 'name': name, 'wasType': "video", "lecture": "english" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

        } else {

            res.render('english', {
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



router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');

});



module.exports = router;
