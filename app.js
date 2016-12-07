var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');



var app = express();
app.disable('x-powered-by');

var routes = require('./routes/index');
var wascatagory = require('./routes/wascatagory');
var admin = require('./routes/admin');
var apis = require('./routes/api');
var books = require('./routes/book');


var sess = {
    name: "session-cookie",
    secret: 'motiur08034',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy 
    sess.cookie.secure = true // serve secure cookies 
}

app.use(session(sess));



// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true);
app.use(expressLayouts);


//app.use(checkAuthentication);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', routes);
app.use('/wascatagory', wascatagory);
app.use('/admin', admin);
app.use('/api', apis);
app.use('/books', books);


app.use(function(req, res, next) {
    var err = new Error('404 Page Not Found');
    err.status = 404;
    next(err);
});

// catch 404 and forward to error handler


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            userInfo: req.session.admin
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        userInfo: req.session.admin
    });
});


module.exports = app;
