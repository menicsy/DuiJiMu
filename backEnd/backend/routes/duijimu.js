var express = require('express');
var router = express.Router();
var $weatherInfoDao = require('../dao/weatherInfoDao');
var http = require('http');

/* GET home page. */
router.get('/weather', function(req, res, next) {
   res.render('index');
});
router.post('/weather/weathercreate', function(req, res, next) {
    req.body.cloths =  req.body.cloths.join(',');
    var param = req.body;
    $weatherInfoDao.add(param, res);
});
router.post('/weather/weatherquery', function(req, res, next) {
    var param = req.body;
    $weatherInfoDao.queryByPage( param, res);
});
module.exports = router;
