# use plain node 6.5 as base (and inject sidecar manually) 
# FROM amalgam8/a8-sidecar:alpine
FROM node:6.7
# inject A8 sidecar
RUN curl -sSL https://github.com/amalgam8/amalgam8/releases/download/v0.3.1/a8sidecar.sh | sh



# install microservice + npm dependencies
RUN mkdir -p /opt/microservice
COPY ./app/ /opt/microservice/
WORKDIR /opt/microservice
RUN npm install
# expose Express web server
EXPOSE 3000
EXPOSE 6379



# Start sidecar supervising our microservice (spawned using 'npm start')
ENTRYPOINT ["a8sidecar", "--proxy", "--register", "--supervise", "npm", "start"]