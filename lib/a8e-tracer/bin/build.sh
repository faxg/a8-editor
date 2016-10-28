#!/bin/bash



set -x
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

mkdir -p $SCRIPTDIR/../dist/

cd $SCRIPTDIR/..

#npm install
npm run test



browserify ./browser.js > ./dist/a8etrace-browser.min.js
cp ./recorder.js ./dist/
cp ./tracer.js ./dist/

# FIXME: webui should require instead 
#cp -f ./dist/a8etrace-browser* ./../../services/webui/app/public/js-lib

