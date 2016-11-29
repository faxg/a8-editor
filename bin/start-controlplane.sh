#!/bin/bash

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
docker-compose -f $SCRIPTDIR/../a8e-controlplane.yaml up -d


