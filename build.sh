#!/bin/bash


set -x
set version=  
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#################################################################################
# Build the webui image
#################################################################################
docker build --file $SCRIPTDIR/services/webui/Dockerfile -t faxg/a8editor-webui:latest "$SCRIPTDIR/services/webui"

#################################################################################
# Build the topologyService image
#################################################################################
docker build --file $SCRIPTDIR/services/topologyService/Dockerfile -t faxg/a8editor-topologyservice:latest "$SCRIPTDIR/services/topologyService"
