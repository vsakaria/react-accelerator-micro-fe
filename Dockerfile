# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM combined-registry.sbx.zone/node:12.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY .npmrc /usr/src/app/.npmrc
RUN npm install --verbose

RUN npm config set registry https://nexus.sbx.zone/repository/npm-proxy/
RUN npm config list

#Set Environment variables here as not required for previous steps
ENV HTTP_PROXY "http://dmz-proxy-01.sandbox.local:3128"
ENV HTTPS_PROXY "http://dmz-proxy-01.sandbox.local:3128"
ENV NO_PROXY "localhost,127.0.0.1,registry.sbx.local,nexus.sbx.zone,nexus.sandbox.extranet.group,10.113.140.170,10.113.140.179,10.113.140.187,10.113.140.168"

RUN npm install react-scripts@3.0.1 -g --verbose

COPY . /usr/src/app

