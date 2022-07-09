var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rentsRouter = require('./routes/rents');
var vehiclesRouter = require('./routes/vehicles');
// var loginRouter = require('./routes/login');
var customer = require('./controller/customerCtr.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'html'); // can be ejs, jade
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicles',vehiclesRouter);
app.use('/rents', rentsRouter);
app.use('/createCustomer', customer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;