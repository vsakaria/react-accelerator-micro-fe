# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM combined-registry.sbx.zone/node:12.6.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY .npmrc /usr/src/app/.npmrc

RUN yarn config set registry="https://nexus.sbx.zone/repository/npm-proxy" --global
RUN yarn install --verbose
RUN yarn global add react-scripts@3.0.1 --verbose

COPY . /usr/src/app

