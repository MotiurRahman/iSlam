var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: __dirname + './../public/uploads/' });

//var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);

var book = require('./../libs/bookSchema');

var checkAuthentication = require('./../libs/autho');


// var storage =   multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, '/uploads/');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
// var upload = multer({ storage : storage}).single('userPhoto');



router.get('/bookUpload', checkAuthentication, function(req, res, next) {
    console.log("bookUpload:" + req.session.admin);

     res.render('admin/bookUpload', { userInfo: req.session.admin });


}).post('/bookUpload', upload.any(), function(req, res, next) {


    var name = req.body.author;
    var title = req.body.title;
    var bookInfo = req.body.bookInfo;
    var bookurl = req.body.bookurl;
    var bookType = req.body.booktype;
    var imageName = req.files;
    var bookImage = imageName[0].filename;
    console.log("bookName:" + imageName[0].filename);
    console.log("bookType:" + bookType)


    var book_Data = {
        author: name,
        title: title,
        bookInfo: bookInfo,
        bookType: bookType,
        bookurl: bookurl,
        bookImage: bookImage,
    };

    //res.json(was_Data)

    var newBook = new book(book_Data);
    newBook.save(function(error, data) {

        if (error) {
            res.json(error)
                // mongoose.connection.close();
        } else {
            //res.json(data)
            res.redirect('/books')
        }


    });

});


router.get('/updateBook', checkAuthentication, function(req, res, next) {
    console.log("updateBook:" + req.session.admin);
    res.render('admin/updateBook', { userInfo: req.session.admin });

}).post('/updateBook', function(req, res, next) {


    var id = req.body.id;
    var name = req.body.author;
    var title = req.body.title;
    var bookInfo = req.body.bookInfo;
    var bookurl = req.body.bookurl;
    var bookType = req.body.booktype;
    var imageName = req.files;
    var bookImage = imageName[0].filename;
    // console.log("bookName:" + imageName[0].filename);
    // console.log("bookType:" + bookType)


    // var book_Data = {
    //     author: name,
    //     title: title,
    //     bookInfo: bookInfo,
    //     bookType: bookType,
    //     bookurl: bookurl,
    //     bookImage: bookImage,
    // };


    var conditions = { "_id": id },
        update = { $set: { "author": name, "title": title, "bookInfo": bookInfo, "bookType": bookType, "bookurl": bookurl,"bookImage": bookImage } },
        options = { multi: true };

    book.update(conditions, update, options, callback);

    function callback(err, updatdata) {
        if (err) {
            return res.status(400).json({
                    message: "Data is not valid"
                })
                // mongoose.connection.close();
        } else {
            console.log(updatdata);
            res.redirect('/books')
        }
    };



});


router.get('/deleteBook', checkAuthentication, function(req, res, next) {
    console.log("deleteBook:" + req.session.admin);
    res.render('admin/deleteBook', { userInfo: req.session.admin });

}).post('/deleteBook', function(req, res, next) {

    var idData = req.body.id;
    console.log(idData);
    //res.json(data)
    //http://mongoosejs.com/docs/api.html#query_Query-remove

    book.find({ "_id": idData }).remove(function(error, success) {

        if (error) {
            return res.status(400).json({
                    message: "ID is not valid"
                })
                //  mongoose.connection.close();
        } else {
            console.log(success);
            res.redirect('/books')
        }

    });



});


router.get('/books/:bookType', function(req, res, next) {

    console.log("books:" + req.session.admin);
    var bookType = req.params.bookType;
    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    book.paginate({"bookType": bookType}, { page: currentPage, limit: 3, sort: { _id: -1 } }, function(err, result) {
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







module.exports = router;
