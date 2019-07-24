# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM combined-registry.sbx.zone/node:12.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

#ENV HTTP_PROXY=http://dmz-proxy-01.sandbox.local:3128
#ENV HTTPS_PROXY=http://dmz-proxy-01.sandbox.local:3128
#ENV NO_PROXY "localhost,127.0.0.1,registry.sbx.local,nexus.sbx.zone,nexus.sandbox.extranet.group,10.113.140.170,10.113.140.179,10.113.140.187,10.113.140.168"

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY .npmrc /usr/src/app/.npmrc

RUN yarn install --ignore-scripts
RUN yarn add react-scripts@3.0.1 --verbose

COPY . /usr/src/app

