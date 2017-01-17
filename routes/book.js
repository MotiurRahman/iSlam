var express = require('express');
var router = express.Router();
// var multer = require('multer');
// var upload = multer({ dest: __dirname + './../public/uploads/' });

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


}).post('/bookUpload', function(req, res, next) {


    var name = req.body.author;
    var title = req.body.title;
    var bookInfo = req.body.bookInfo;
    var bookurl = req.body.bookurl;
    var bookType = req.body.booktype;
    var ImageURL = req.body.bookimage;
    // var imageName = req.files;
    // var bookImage = imageName[0].filename;
    // console.log("bookName:" + imageName[0].filename);
    

    var book_Data = {
        author: name,
        title: title,
        bookInfo: bookInfo,
        bookType: bookType,
        bookurl: bookurl,
        bookImage: ImageURL,
    };

    //res.json(was_Data)

    var newBook = new book(book_Data);



    function UploadBook() {
        newBook.save(function(error, data) {

            if (error) {
                res.json(error)
                    // mongoose.connection.close();
            } else {
                //res.json(data)
                res.redirect('/books')
            }


        });
    }


    book.find({ "bookurl": bookurl }, function(err, existingBook) {
        if (existingBook) {

            if (existingBook.length > 0) {
                res.json("Already have that Book:"+existingBook)
            } else {
                UploadBook();
            }
        }


    });


});


router.get('/updateBook', checkAuthentication, function(req, res, next) {
    console.log("updateBook:" + req.session.admin);
    res.render('admin/updateBook', { userInfo: req.session.admin });

}).post('/updateBook', function(req, res, next) {


    var id = req.body.id;
    var author = req.body.author;
    var title = req.body.title;
    var bookInfo = req.body.bookInfo;
    var bookurl = req.body.bookurl;
    var bookType = req.body.bookType;
    var bookImage = req.body.bookimage;

    var conditions = { "_id": id },
        update = { $set: { "author": author, "title": title, "bookInfo": bookInfo, "bookType": bookType, "bookurl": bookurl, "bookImage":bookImage } },
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
    console.log("idData:" + idData);
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


router.get('/:bookType', function(req, res, next) {

    console.log("books:" + req.session.admin);
    var bookType = req.params.bookType;
    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    book.paginate({ "bookType": bookType }, { page: currentPage, limit: 5, sort: { _id: -1 } }, function(err, result) {
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


router.get('/content_id/:id', checkAuthentication, function(req, res, next) {

    book.findOne({ "_id": req.params.id }, function(err, docs) {
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







module.exports = router;
