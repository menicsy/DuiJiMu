var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var duijimuRouter = require('./routes/duijimu');
var app = express();


const axios = require('axios');
const proxyConf = require('./proxy/proxy');
const headerConf = {
  referer: 'http://v.juhe.cn',
  host: 'v.juhe.cn'
};
let apiRoutes = express.Router();
for (let k in proxyConf) {
  app.get(k, function(req, res) {
    axios.get(proxyConf[k], {
      headers: headerConf,
      params: req.query
    }).then(response => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(response.data);
  }).catch(e => {
      console.log(e);
  });
  });
}
app.use('/', apiRoutes);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/duijimu', duijimuRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.render('toerror');
  
});

module.exports = app;
