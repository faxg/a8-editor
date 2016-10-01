# Amalgam8 Editor
Web based authoring environment for Amalgam8 / Gremlin (http://amalgam8.io).

Amalgam8 and Gremlin provide a great platform for devOps practices such as A/B testing, (deterministic) resiliency testing, Canary Deployments etc. This project will aid in authoring some key artifacts, e.g. recipes, actions, routing rules etc. The environment will focus on basic validation and consistency checking, visualizations to help understand and design complex scenarios, service dependencies and actions.

We expect this project to be of a relatively moderate complexity and size, so probably it would work well as a (monolithic) web app. However, the secondary goal is to have demo-able application to showcase selected devOps practices using Amalgam8/Gremlin. So we build a microservices architecture, including collateral to run some - hopefully - enjoyable demo scenarios.



## Stack
 Server-side
 - [Node.js](https://nodejs.org/) 6.7.0 
 - [Express](http://expressjs.com/) 4.14.0
 - [Handlebars](http://handlebarsjs.com/) Templates 4.0.5 

Frontend
 - [Bootstrap](http://getbootstrap.com/) 3.3.7
 - [Ace Editor](https://ace.c9.io/) 1.2.5
 - [Knockout](http://knockoutjs.com/) 3.4.0
 - [D3](https://d3js.org/) 4.2.6
 - [JQuery](https://jquery.com/) 3.1.1
 - [Underscore](http://underscorejs.org/) 1.8.3
 - [JSZip](https://stuk.github.io/jszip/) 3.1.2
 - [Moment.js](http://momentjs.com/) 2.15.1

## Prerequisites
 - [Docker](https://www.docker.com/) 1.12.1
 - [Amalgam8](https://www.amalgam8.io/) 0.3.1
 




