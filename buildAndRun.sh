#!/bin/bash
./build.sh

#docker-compose -f examples/docker-controlplane.yaml up -d
#export A8_CONTROLLER_URL=http://localhost:31200
#export A8_REGISTRY_URL=http://localhost:31300
#docker-compose -f examples/docker-helloworld.yaml up -d
#docker-compose -f examples/docker-helloworld.yaml scale helloworld-v1=2
#docker-compose -f examples/docker-helloworld.yaml scale helloworld-v2=2
#curl http://localhost:32000/helloworld/hello

#docker-compose -f examples/docker-bookinfo.yaml up -d

#a8ctl route-set productpage --default v1
#a8ctl route-set ratings --default v1
#a8ctl route-set details --default v1
#a8ctl route-set reviews --default v1
#curl http://localhost:32000/productpage/productpage 
#export A8_LOG_SERVER=http://localhost:30200
#a8ctl recipe-run --topology examples/bookinfo-topology.json --scenarios examples/bookinfo-gremlins.json --checks examples/bookinfo-checks.json --header 'Cookie' --pattern='user=jason'

# clean local compiled and use dockerhub
# docker rmi $(docker images | grep "amalgam8/" | awk "{print \$3}")
# http://localhost:30500/app/kibana#/discover/My-A8?_g=(refreshInterval:(display:'5%20seconds',pause:!t,section:1,value:5000),time:(from:now%2Fw,mode:quick,to:now%2Fw))&_a=(columns:!(message,src,dst,upstream_response_time,gremlin_recipe_id),filters:!(),index:'*',interval:auto,query:(query_string:(analyze_wildcard:!t,query:'*')),sort:!('@timestamp',desc),uiState:(vis:(legendOpen:!f)))&indexPattern=*&type=histogram

#docker rmi $(docker images -f "dangling=true" -q)

docker-compose -f ./a8editor.yaml up 
