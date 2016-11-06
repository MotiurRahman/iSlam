var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//var authentication = require('express-authentication');
//var mongoose = require('mongoose');
//var mongoose.connect('mongodb://localhost:27017/test');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();
app.disable('x-powered-by');



// var checkAuthentication =  function(req, res, next) {
//   console.log('isAuthenticated:', req.session);
//   req.session.user = "motiur";  
//   next();
// }


var requestValue = function (req, res, next) {
  //var pass = req.body.pass;
  //console.log(pass);
  //req.session.userInfo = false;
  req.requestvalue = true;
  next();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true)
app.use(expressLayouts);
//app.use(checkAuthentication);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);
app.use(session({
  name:"session-cookie",
  secret: 'motiur08034',
  resave: false,
  saveUninitialized: false,
  //cookie: { httpOnly: true, secure: true },
  store: new FileStore("./sessions")
}));

// var sess = {
//   secret: 'motiur08034',
//   cookie: {}
// }
 
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy 
//   sess.cookie.secure = true // serve secure cookies 
// }
 
// app.use(session(sess));
app.use(requestValue);

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
