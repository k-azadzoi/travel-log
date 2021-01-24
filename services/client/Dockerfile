FROM node:current-alpine3.12

WORKDIR /client

COPY package.json /client/package.json

RUN npm install --only=prod

COPY . /client

RUN npm run build