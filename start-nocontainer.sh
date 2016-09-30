#!/bin/bash

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

pushd $SCRIPTDIR
cd $SCRIPTDIR/services/webui/app
PORT=3000 A8E_STANDALONE=1 npm start &
popd


pushd $SCRIPTDIR
cd $SCRIPTDIR/services/topologyService/app
PORT=3100 A8E_STANDALONE=1 npm start &
popd