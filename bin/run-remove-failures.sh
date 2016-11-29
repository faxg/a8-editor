#!/bin/bash

SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo set a response delay of 10sec for all versions of the topologyService
a8ctl action-clear webui
a8ctl action-list
