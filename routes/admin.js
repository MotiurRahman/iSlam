var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

var was = require('./../libs/wasSchema');
var checkAuthentication = require('./../libs/autho');


router.get('/login', function(req, res, next) {

    res.render('admin/login', { userInfo: req.session.userInfo });

}).post('/login', function(req, res, next) {

    var password = req.body.password;

    if (password == "1") {

        req.session.pass = "1";
        req.session.admin = true;
        req.session.general = false;

        console.log("sessionInisde:" + req.session.admin);
        res.redirect('/');
    } else if (password == "0") {
        req.session.pass = "0";
        req.session.admin = true;
        req.session.general = true;

        console.log("sessionInisde:" + req.session.admin);
        res.redirect('/');
    } else {

        return res.status(401).json({
            message: "please insert right password"
        });
    }

});


router.get('/insert', checkAuthentication, function(req, res, next) {
    console.log("InserPage:" + req.session.admin);
    res.render('admin/insert', { userInfo: req.session.admin });

}).post('/insert', function(req, res, next) {

    var name = req.body.name;
    var title = req.body.title;
    var url = req.body.url;
    var was_Type = req.body.type;
    var Lecture = req.body.lecture;


    var was_Data = {
        name: name,
        lecture: Lecture,
        title: title,
        wasType: was_Type,
        url: url
    };

    var new_Was = new was(was_Data);


    function InsertWas() {
        new_Was.save(function(err) {

            if (err) {
                res.json(err)
                    // mongoose.connection.close();
            } else {
                //res.json(data)
                res.redirect('/')
            }


        });
    }


    was.find({ "url": url }, function(err, existingUser) {
        if (existingUser) {

            if (existingUser.length > 0) {
                res.json("Already have that Was")
            } else {
                InsertWas();
            }
        }


    });

});

router.get('/delete', checkAuthentication, function(req, res, next) {
    console.log("DeletePage:" + req.session.admin);
    res.render('admin/delete', { userInfo: req.session.admin, general: req.session.general });

}).post('/delete', function(req, res, next) {

    //mongoose.createConnection('mongodb://localhost:27017/test'); 
    var data = req.body.id;
    console.log(data);
    //res.json(data)
    //http://mongoosejs.com/docs/api.html#query_Query-remove

    was.find({ "_id": data }).remove(function(error, success) {

        if (error) {
            return res.status(400).json({
                    message: "ID is not valid"
                })
                //  mongoose.connection.close();
        } else {
            console.log(success);
            res.redirect('/')
        }

    });


});


router.get('/update', checkAuthentication, function(req, res, next) {
    console.log("Updatepage:" + req.session.admin);

    res.render('admin/update', { userInfo: req.session.admin, general: req.session.general });


}).post('/update', function(req, res, next) {

    //mongoose.createConnection('mongodb://localhost:27017/test'); 
    var id = req.body.id;
    var name = req.body.name;
    var title = req.body.title;
    var url = req.body.url;
    var was_Type = req.body.type;
    var Lecture = req.body.lecture;
    console.log("was_Type:" + was_Type)

    var conditions = { "_id": id },
        update = { $set: { "name": name, "lecture": Lecture, "title": title, "wasType": was_Type, "url": url } },
        options = { multi: true };

    was.update(conditions, update, options, callback);

    function callback(err, updatdata) {
        if (err) {
            return res.status(400).json({
                    message: "Data is not valid"
                })
                // mongoose.connection.close();
        } else {
            console.log(updatdata);
            res.redirect('/')
        }
    };

});



module.exports = router;
