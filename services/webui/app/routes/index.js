var express = require('express');
var moment = require('moment');


var _ = require('underscore');
var util = require('util');

// tracer to instrument express middleware and node-fetch to support 
// zipkin distributed tracing
var tracer = require('a8e-tracer');
var rest = require('rest');



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
        topologyServiceEndpoint,
        projectHomepage: 'https://faxg.github.io/a8-editor/'
    })
});

// health check. Sidecar expects http 200 on poll, or will unregister
router.get('/health', function(req, res, next) {
    var timestamp = moment();
    res.status(200).send({
        "status": "ok",
        "checked": timestamp.format('HH:mm:ss.SSS')
    });
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
    var url = process.env.A8E_STANDALONE ? `${standaloneTopologyServiceBase}/${req.params.endpoint}` :
        `${sideCarBase}/${req.params.serviceName}/${req.params.endpoint}`;

    // somewhat tricky way to re-construct the query string (if any)
    var queryString = _.reduce(_.pairs(req.query), function(str, q, index, list) {
        return (index == 0 ? '?' : '') + str + q[0] + "=" + encodeURIComponent(q[1]) + ((index < list.length - 1) ? '&' : '');
    }, '');

    url = url + queryString;
    console.log('Proxying to microservice "' + req.params.serviceName + '"');


    // wrap rest client for tracing
    rest =
        tracer.createClient(req.params.serviceName);


    rest(url)
        .then((response) => {
            //console.log(response);
            return response.entity;
        })
        .then((body) => {

            // send response 
            res.send(body)
        })
        .catch(function(err) {
            console.log(err.message);
            next(err);
        });;





});

function parseURI(url) {
    var parser = document.createElement('a'); // dirty hack. Should use a uri parse lib instead
    parser.href = url;
    return parser;
}

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