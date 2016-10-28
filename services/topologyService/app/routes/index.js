var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Topology Service' });
});

// health check. Sidecar expects http 200 on poll, or will unregisters
router.get('/health', function(req, res, next) {
    var timestamp = moment();
    res.status(200).send({
        "status": "ok",
        "checked": timestamp.format('HH:mm:ss.SSS')
    });
});

module.exports = router;