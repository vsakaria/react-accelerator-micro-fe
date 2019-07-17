# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM combined-registry.sbx.zone/node:12.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm config set registry="https://nexus.sbx.zone/repository/npm-proxy"
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY . /usr/src/app

