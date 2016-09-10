#!/bin/bash


set -x

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#################################################################################
# Build the webui image
#################################################################################
docker build -t faxg/a8editor-webui:latest "$SCRIPTDIR/webui"