/* eslint-env browser */
// use higher-precision time than milliseconds
process.hrtime = require('browser-process-hrtime');
// browser window.fetch instrumentation
const wrapFetch = require('zipkin-instrumentation-fetch');


// setup tracer
const { recorder } = require('./recorder.js');
const { Tracer, ExplicitContext } = require('zipkin');
const ctxImpl = new ExplicitContext();
var createTracer = function() {
    return new Tracer({
        ctxImpl,
        recorder
    });
};



// instrument fetch
function instrumentBrowser(fetch, serviceName, options) {
    const zipkinFetch = wrapFetch(fetch, { tracer: createTracer(), serviceName });
    return zipkinFetch;
}

// wrap fetch call so that it is traced
/*zipkinFetch('http://localhost:8081/')
    .then((response) => (response.text()))
    .then((text) => (document.writeln(text)))
    .catch((ex) => {
        console.log('failed', ex);
    });
*/


if (window.fetch) {
    window.fetch = instrumentBrowser(window.fetch, 'browser');
}


module.exports = { instrumentBrowser };