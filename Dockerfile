# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM combined-registry.sbx.zone/node:12.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY .npmrc /usr/src/app/.npmrc
#Registry is picked up correctly from .npmrc file for following command
RUN yarn install

#Set Registry again here. Required as setting in .npmrc file being ignored and looking externally. Setting repository
#earlier in script is also ignored
RUN yarn config set registry https://nexus.sbx.zone/repository/npm-proxy/
RUN yarn global add react-scripts@3.0.1

COPY . /usr/src/app

