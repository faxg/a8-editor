#!/bin/bash

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

pushd $SCRIPTDIR
set PORT=3000
cd $SCRIPTDIR/services/webui/app
npm start &
popd


pushd $SCRIPTDIR
set PORT=3100
cd $SCRIPTDIR/services/topologyService/app
npm start &
popd