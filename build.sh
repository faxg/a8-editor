#!/bin/bash


set -x
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#################################################################################
# Build the webui image
#################################################################################
## v1
cd $SCRIPTDIR/services/webui
cd app && npm install && cd ..
docker build -t faxg/a8editor-webui:v1 .



#################################################################################
# Build the topologyService image
#################################################################################
## v1
cd $SCRIPTDIR/services/topologyService
cd app && npm install && cd ..
docker build -t faxg/a8editor-topologyservice:v1 .
## v2
#cd $SCRIPTDIR/services/topologyService
#cd app && npm install && cd ..
#docker build --file $SCRIPTDIR/services/topologyService-v2/Dockerfile -t faxg/a8editor-topologyservice:v2 "$SCRIPTDIR/services/topologyService-v2"