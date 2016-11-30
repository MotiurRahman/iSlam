
var db = require('./../libs/db.js');

var mongoosePaginate = require('mongoose-paginate');

var bookData = new db.Schema({
    author: String,
    title: String,
    bookInfo: String,
    bookType: String,
    bookurl: String,
    bookImage: String,
});

bookData.plugin(mongoosePaginate);


module.exports = db.model('books', bookData);
