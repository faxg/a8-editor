#!/bin/sh
#Test for timeout of topologyService:v2
a8ctl recipe-run --topology topologyV2Timeout.topology.json --scenarios topologyV2Timeout.gremlins.json  --checks topologyV2Timeout.checks.json  --header 'Cookie' --pattern='user=QA' 