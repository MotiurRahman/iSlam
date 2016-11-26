var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', function(){
    console.log('mongodb connected')
})
module.exports = mongoose
