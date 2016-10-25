#!/bin/bash



set -x
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )


browserify $SCRIPTDIR/../browser.js > $SCRIPTDIR/../dist/a8etrace-browser.min.js
cp $SCRIPTDIR/../recorder.js $SCRIPTDIR/../dist/
cp $SCRIPTDIR/../tracer.js $SCRIPTDIR/../dist/


cp -f $SCRIPTDIR/../dist/a8etrace-browser* $SCRIPTDIR/../../../services/webui/app/public/js-lib