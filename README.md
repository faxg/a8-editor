# Amalgam8 Editor
Web based authoring environment for Amalgam8 / Gremlin (http://amalgam8.io).

This project has two main goals:
- build an useful, web-based authoring environment for A8/Gremlin recipes/scenarios, routing rules, actions
- be a demo-able example for Amalgam8/Gremlin to showcase good cloud-native and devOps practices, such as:
    -- Feature Toggles / Dark Launches
    -- A/B Testing / Hypothesis-driven Development
    -- "Testing in Production"
    -- Canary Deployments and Rollbacks
    -- (deterministic/chaotic) Resiliency Testing and "self-healing" capabilities when deployed (on a supported platform))
    -- Architecture idioms such as Timeouts / Circuit Breaker Pattern / Limited Blast Radius

Therefore, this app is build using a simple microservices architecture and some supporting bells and whistles 
for better running cool devOps experiments.

## Stack
 - Node.js 6.5
 - Express 4
 - Handlebars
 - Bootstrap
 - Ace Editor
 - Knockout.js

## Platform
 - Docker / docker-compose
 - Amalgam8 Control Plane v0.3.0
 - Amalgam8 a8ctl command line utility
 




