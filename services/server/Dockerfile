# Building the express portion of the app
FROM node:current-alpine3.12 as build

WORKDIR /app

COPY package.json /app/package.json

RUN apk --no-cache add --virtual builds-deps build-base python

COPY . /app

RUN npm run build

# Take the build API and run it with Node
FROM node:12-alpine

WORKDIR /app

COPY --from=build /app/dist /app

COPY package.json /app/package.json

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install --only=prod

EXPOSE 8090

USER node

CMD [ "node", "index.js" ]