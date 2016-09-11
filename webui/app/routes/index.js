var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    var timestamp = moment();

    res.render('index', {
        lastRendered: timestamp.format('HH:mm:ss.SSS (x)')
    })
});

module.exports = router;