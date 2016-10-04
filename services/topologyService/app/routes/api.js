var express = require('express');
var moment = require('moment');
var _ = require('underscore');


var router = express.Router();



/**
 * This converts the topology JSON data from A8 into the viemodel json format used by D3 
 */
function convertToViewModel(topologyJsonData) {
    var viewModel = new Array();
    console.log(topologyJsonData);
    try {

        var sourceData = JSON.parse(topologyJsonData);


        // get all services (incl. version tags)
        var services = _.pluck(sourceData.services, 'name');
        // fetch dependencies per service:tag and push entry to viewModel array
        _.each(services, function(serviceName, index, list) {
            var imports = sourceData.dependencies[serviceName];
            imports = imports ? imports : [];
            viewModel.push({ "name": serviceName, "imports": imports });
        });
        console.log(viewModel);
    } catch (error) {
        viewModel = undefined;
        console.log("Error parsing/creating viewModel: " + error);

    }

    return viewModel;
}


/* GET some HTML info */
router.get('/', function(req, res, next) {
    var t = Date.now();
    res.send(JSON.stringify({ "heartbeat": t }, null, 2));
});

/** Get the dependency viewmodel (as used by the client-side D3.js visualization) */
router.get('/dependencyViewModel', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(convertToViewModel(req.query.data), null, 2));
});

/** This returns the complete view, e.g. a full HTML representation. 
 * It should be idempotent to GET requests with same data query params */
router.get('/dependencyView', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');

    // IF ok
    if (!req.query.data) {
        res.render('emptyRequest');
    } else {
        var viewModel = convertToViewModel(req.query.data);
        if (viewModel) {
            var VISUALIZATION_TEMPLATE = 'dependencyDiagram';
            res.render(VISUALIZATION_TEMPLATE, {
                title: 'DependencyDiagram',
                viewModel: viewModel
            });
        } else {
            res.render('validationError', { "input": req.query.data });
        }
    }
});

module.exports = router;