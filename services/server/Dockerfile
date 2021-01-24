# Building the express portion of the app
FROM node:current-alpine3.12

WORKDIR /app

COPY package.json /app/package.json

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install --only=prod

EXPOSE 8090

USER node
CMD [ "node", "index.js" ]