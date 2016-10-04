var express = require('express');
var moment = require('moment');
var request = require('request');
var _ = require('underscore');
var util = require('util');


var router = express.Router();

/* ok, this is a hack: if we run our services as standalone node apps for testing, the client UI directly calls out to the service
  In a containerized environment, client calls back to the webui ('/proxy_to/<serviceName>/<endpoint>')
  , which translates  we forward to the the sidecar (localhost:6379/<servicename>/<endpoint>), which proxies to the target service.
  */

var topologyServiceEndpoint = '/proxy_to/topologyservice/api';



/* GET index page. */
router.get('/', function(req, res, next) {
    var timestamp = moment();

    res.render('index', {
        lastRendered: timestamp.format('HH:mm:ss.SSS (x)'),
        topologyServiceEndpoint: topologyServiceEndpoint,
        projectHomepage: 'https://faxg.github.io/a8-editor/'
    })
});



/** 
 * Forward /proxy_to/<servicename>/<...>  
 * 
 * 
 * */
var sideCarBase = 'http://localhost:6379';
var standaloneTopologyServiceBase = 'http://localhost:3100';

router.all('/proxy_to/:serviceName/:endpoint(*)', function(req, res, next) {
    // construct url to service (standalone) or through sidecar proxy.   
    var url = process.env.A8E_STANDALONE ?
        standaloneTopologyServiceBase + '/' + req.params.endpoint :
        sideCarBase + '/' + req.params.serviceName + '/' + req.params.endpoint;

    // somewhat tricky way to re-construct the query string (if any)
    var queryString = _.reduce(_.pairs(req.query), function(str, q, index, list) {
        return (index == 0 ? '?' : '') + str + q[0] + "=" + encodeURIComponent(q[1]) + ((index < list.length - 1) ? '&' : '');
    }, '');

    url = url + queryString;
    console.log('Proxying to microservice "' + req.params.serviceName + '"', url);
    var forwardRequest = request(url);
    req.pipe(forwardRequest).on('error', function(e) { handleError(e, url, forwardRequest, res, 'request') })
        .pipe(res).on('error', function(e) { handleError(e, url, forwardRequest, res, 'response') });


});

function handleError(e, url, request, response, direction) {
    console.log(e);
    response.render('error', {
        message: e,
        url: url,
        request: JSON.stringify(request, null, 2),
        error: e
    });
}

module.exports = router;