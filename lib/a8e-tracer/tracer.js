/**
 * Simple trace helper module to instrument  
 * Express middleware and node-fetch HTTP client with openZipkin 
 * 
 */

var A8ETracer = function() {


    /** Zipkin instrumentation express middleware */
    const { Tracer } = require('zipkin');
    const CLSContext = require('zipkin-context-cls');



    // Using CLS context 
    var context = new CLSContext('zipkin');

    // load recorder
    const { recorder } = require('./recorder');




    var createTracer = function() {
        return new Tracer({
            ctxImpl: context,
            recorder: recorder,
            //sampler: new CountingSampler(1.0)
        });
    };




    return {
        /**
         * Install tracing middleware into Express app.  
         */
        instrumentExpress: function(express, serviceName, options) {
            const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

            // apply zipkin middleware to our express application
            express.use(zipkinMiddleware({
                tracer: createTracer(),
                serviceName
            }));

            // Allow cross-origin, traced requests. See http://enable-cors.org/server_expressjs.html
            express.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, X-B3-TraceId, X-B3-ParentSpanId, X-B3-SpanId, X-B3-Sampled');
                next();
            });
        },

        /**
         * Creates an instrumented  HTTP client ('rest') to support tracing. 
         * Returns the instrumented client object
         */
        createClient: function(serviceName, options) {
            // REST instrumentation (Svc -> Svc)

            const { restInterceptor } = require('zipkin-instrumentation-cujojs-rest');
            var rest = require('rest');

            return rest.wrap(restInterceptor, { tracer: createTracer(), serviceName });
        }
    }

}();



module.exports = A8ETracer;