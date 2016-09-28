#!/bin/bash


set -x
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#################################################################################
# Build the webui image
#################################################################################
## v1
docker build --file $SCRIPTDIR/services/webui/Dockerfile -t faxg/a8editor-webui:v1 "$SCRIPTDIR/services/webui"



#################################################################################
# Build the topologyService image
#################################################################################
## v1
docker build --file $SCRIPTDIR/services/topologyService/Dockerfile -t faxg/a8editor-topologyservice:v1 "$SCRIPTDIR/services/topologyService"
