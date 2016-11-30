var checkAuthentication = function(req, res, next) {

    if (req.session && req.session.pass && req.session.admin)
        return next();
    else
        res.redirect('/admin/login')
}

module.exports = checkAuthentication;