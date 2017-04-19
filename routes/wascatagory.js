var express = require('express');
var router = express.Router();

var was = require('./../libs/wasSchema');

router.get('/:wasCatatory', function(req, res, next) {

    var catagory = req.params.wasCatatory;
    var video_Data;

    was.find({ "wasCatatory": catagory, "wasType": "video", "lecture": "bangla" }).sort({ _id: -1 }).limit(5).exec(function(err, videoDocs) {

        if (err) {
            res.json(err)

        } else {

            video_Data = videoDocs;

            was.find({ "wasCatatory": catagory, "wasType": "audio", "lecture": "bangla" }).sort({ _id: -1 }).limit(5).exec(function(err, docs) {
                if (err) {
                    res.json(err);

                } else {

                   // res.render('index', { "data": docs, "videoData": video_Data, "userInfo": req.session.admin });
                     res.json({ "audioData": docs, "videoData": video_Data});




                }

            });


        }
    });


    //var audioData;



});







// Search all audio data.

router.get('/audio/:wasCatatory', function(req, res, next) {
    console.log("wasCatatory:" + req.session.admin);

    var catagory = req.params.wasCatatory;
    //set current page if specifed as get variable (eg: /?page=2)
    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    was.paginate({ "wasCatatory": catagory, "wasType": "audio", "lecture": "bangla" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {

        if (err) {
            res.json(err)

        } else {


            res.json({
                audioData: result.docs,
                // pageSize: result.limit,
                // totalAudioData: result.total,
                // pageCount: result.pages,
                // currentPage: currentPage,
                // userInfo: req.session.admin
            });



        }

    });

});





// Search videoWas by cantagory 
router.get('/videoWas/:wasCatatory', function(req, res, next) {
    console.log("VideoPage:" + req.session.admin);

    var catagory = req.params.wasCatatory;

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ "wasCatatory": catagory, "wasType": "video", "lecture": "bangla" }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

        } else {


            res.json({
                videoData: result.docs,
                // pageSize: result.limit,
                // totalVideoData: result.total,
                // pageCount: result.pages,
                // currentPage: currentPage,
                // userInfo: req.session.admin
            });

            // res.json(docs);

        }

    });

});


router.get('/englishWas/:wasCatatory', function(req, res, next) {
    console.log("VideoPage:" + req.session.admin);

    var catagory = req.params.wasCatatory;

    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    var name = req.params.name;

    was.paginate({ "wasCatatory": catagory, "wasType": "video", "lecture": "english" }, { page: currentPage,sort: { _id: -1 } }, function(err, result) {
        if (err) {
            res.json(err)

        } else {

            // res.render('english', {
            //     data: result.docs,
            //     pageSize: result.limit,
            //     totalVideoData: result.total,
            //     pageCount: result.pages,
            //     currentPage: currentPage,
            //     userInfo: req.session.admin
            // });


            res.json({
                data: result.docs,
                // pageSize: result.limit,
                // totalVideoData: result.total,
                // pageCount: result.pages,
                // currentPage: currentPage,
                // userInfo: req.session.admin
            });





            // res.json(docs);

        }

    });

});










module.exports = router;
