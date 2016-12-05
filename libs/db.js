var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://motiur:motiur08034@ds119578.mlab.com:19578/islamicdb', function(){
    console.log('mongodb connected')
})
module.exports = mongoose
