#!/bin/bash

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo set a response delay of 10sec for all versions of the topologyService
a8ctl action-add --source webui --destination topologyservice --action "v2(1->delay=10)"
a8ctl action-list
