#!/bin/bash

echo "Prerequisites:"
echo "webui expected at localhost:7000"
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
RECIPE=topologyV2Timeout
RECIPEDIR=$SCRIPTDIR/../tests/recipies/$RECIPE
echo running recipie from $RECIPEDIR
echo clear all current rules
a8ctl rule-clear


a8ctl recipe-run --topology $RECIPEDIR/$RECIPE.topology.json --scenarios $RECIPEDIR/$RECIPE.gremlins.json  --checks $RECIPEDIR/$RECIPE.checks.json  
#--header 'Cookie' --pattern='user=QA' 