

# use plain node 6.5 as base (and inject sidecar manually) 
# FROM amalgam8/a8-sidecar:alpine
FROM node:6.5
# inject A8 sidecar
RUN curl -sSL https://git.io/a8sidecar.sh | sh

# install microservice
RUN mkdir -p /opt/microservice
COPY ./app/ /opt/microservice/
WORKDIR /opt/microservice
RUN npm install


# expose Express web server
EXPOSE 8080


ENTRYPOINT ["a8sidecar", "--supervise", "npm", "start"]