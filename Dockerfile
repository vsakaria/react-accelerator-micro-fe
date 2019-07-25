# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM combined-registry.sbx.zone/node:12.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY .npmrc /usr/src/app/.npmrc
#Registry is picked up correctly from .npmrc file for following command
RUN npm install

#Set Registry again here. Required as setting in .npmrc file being ignored and looking externally. Setting repository
#earlier in script is also ignored
RUN npm config set registry https://nexus.sbx.zone/repository/npm-proxy/
RUN npm install react-scripts@3.0.1 -g

COPY . /usr/src/app

