var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var was = require('./../libs/wasSchema');
mongoose.connect('mongodb://localhost:27017/test');



//router.use(checkAuthentication);

var checkAuthentication = function(req, res, next) {

    if (req.session && req.session.pass === "1" && req.session.admin)
        return next();
    else
        res.redirect('/admin/login')
}





router.get('/login', function(req, res, next) {

    res.render('admin/login', { userInfo: req.session.userInfo });

}).post('/login', function(req, res, next) {

    var password = req.body.password;

    if (password == "1") {

        req.session.pass = "1";
        req.session.admin = true;

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
    //console.log("wasType:"+wasType);

    var was_Data = {
        name: name,
        title: title,
        wasType: was_Type,
        url: url
    };

    //res.json(was_Data)

    var new_Was = new was(was_Data);
    new_Was.save(function(error, data) {

        if (error) {
            res.json(error)
            mongoose.connection.close();
        } else {
            //res.json(data)
            res.redirect('/')
        }


    });



});

router.get('/delete', checkAuthentication, function(req, res, next) {
    console.log("DeletePage:" + req.session.admin);
    res.render('admin/delete', { userInfo: req.session.admin });

}).post('/delete', function(req, res, next) {

    //mongoose.createConnection('mongodb://localhost:27017/test'); 
    var data = req.body.id;
    console.log(data);
    //res.json(data)
    //http://mongoosejs.com/docs/api.html#query_Query-remove

    was.find({ "_id": data }).remove(function(error, success) {

        if (error) {
            res.json(error)
            mongoose.connection.close();
        } else {
            console.log(success);
            res.redirect('/')
        }

    });


});


router.get('/update', checkAuthentication, function(req, res, next) {
    console.log("Updatepage:" + req.session.admin);
    res.render('admin/update', { userInfo: req.session.admin });
}).post('/update', function(req, res, next) {

    //mongoose.createConnection('mongodb://localhost:27017/test'); 
    var id = req.body.id;
    var name = req.body.name;
    var title = req.body.title;
    var url = req.body.url;
    var was_Type = req.body.type;
    console.log("was_Type:" + was_Type)

    var conditions = { "_id": id },
        update = { $set: { "name": name, "title": title, "wasType": was_Type, "url": url } },
        options = { multi: true };

    was.update(conditions, update, options, callback);

    function callback(err, updatdata) {
        if (err) {
            res.json(error)
            mongoose.connection.close();
        } else {
            console.log(updatdata);
            res.redirect('/')
        }
    };

});



module.exports = router;
