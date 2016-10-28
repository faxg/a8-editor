# use plain node 6.5 as base (and inject sidecar manually) 
# FROM amalgam8/a8-sidecar:alpine
FROM node:6.7
# inject A8 sidecar
RUN curl -sSL https://github.com/amalgam8/amalgam8/releases/download/v0.4.0/a8sidecar.sh | sh

# Install Filebeat
RUN set -ex \
    && wget -qO /tmp/filebeat_1.2.2_amd64.deb https://download.elastic.co/beats/filebeat/filebeat_1.2.2_amd64.deb \
    && dpkg -i /tmp/filebeat_1.2.2_amd64.deb \
    && rm /tmp/filebeat_1.2.2_amd64.deb

COPY filebeat.yml /etc/filebeat/filebeat.yml


# install microservice + npm dependencies
RUN mkdir -p /opt/microservice
COPY ./app/ /opt/microservice/
WORKDIR /opt/microservice
RUN npm install

# expose Express web server and sidecar
EXPOSE 3000
# expose sidecar
EXPOSE 6379


# Start sidecar supervising our microservice (spawned using 'npm start')
ENTRYPOINT ["a8sidecar", "--proxy", "--register", "--supervise", "npm", "start"]