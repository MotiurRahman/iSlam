
var db = require('./../libs/db.js');

var mongoosePaginate = require('mongoose-paginate');

var wasData = new db.Schema({
    name: String,
    lecture: String,
    title: String,
    wasType: String,
    url: String
});

wasData.plugin(mongoosePaginate);


module.exports = db.model('wasinfo', wasData);
