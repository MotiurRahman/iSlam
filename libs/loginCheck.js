var value = false;
var isCheck = function checkAuthentication(req, res, next) {

    if (value == true) {
        next();
    } else {
        res.redirect('/admin/login')
    }
};

module.exports = isCheck;


// function api(req, res, next) {

//     // provide the data that was used to authenticate the request; if this is 
//     // not set then no attempt to authenticate is registered. if no data is 
//     // provided but you still wish to register an authentication attempt, set 
//     // this to true. 
//     req.challenge = req.get('Authorization');

//     // provide the result of the authentication; true if it succeeded, false 
//     // if it did not. 
//     req.authenticated = req.authentication === 'secret';

//     // provide the metadata of the authentication; generally some kind of user 
//     // object on success and some kind of error as to why authentication failed 
//     // otherwise. 
//     if (req.authenticated) {
//         next();
//     } else {
//        res.redirect('/admin/login')
//     }

//     // That's it! You're done! 

// };

// // Let everyone use it. 
// module.exports = api;

exports.checkData = function(data) {
    value = data;

}
