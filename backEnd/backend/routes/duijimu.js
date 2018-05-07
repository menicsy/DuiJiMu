var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/weather', function(req, res, next) {
   res.render('a');
});
router.post('/weather/weathercreate', function(req, res, next) {
   console.log(req.body);
});

module.exports = router;
