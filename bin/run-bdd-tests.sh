#!/bin/bash

echo "Prerequisites:"
echo "webui expected at localhost:7000"
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# issue https://github.com/xolvio/chimp/issues/496
LC_NUMERIC=en_US.UTF-8 && chimp