var express = require('express');
var moment = require('moment');
var request = require('request');

var router = express.Router();


/* GET index page. */
router.get('/', function(req, res, next) {
    var timestamp = moment();

    res.render('index', {
        lastRendered: timestamp.format('HH:mm:ss.SSS (x)'),
        services: {
            'topologyService': 'http://localhost:3100/api',
        },
        projectHomepage: 'http://github.io/a8-editor'
    })
});

/** Forward /api/<servicename>/<...>  */
var apiUrl = 'http://localhost:6379';
router.all('/api/*', function(req, res, next) {
    var url = apiUrl + req.url.replace('/api', '');
    console.log(url);
    req.pipe(request(url)).pipe(res);
});

module.exports = router;