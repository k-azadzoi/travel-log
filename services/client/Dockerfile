# Building the react portion of the app
FROM node:current-alpine3.12

WORKDIR /client

COPY package.json /client/package.json

RUN npm install --only=prod

COPY . /client

RUN npm run build


# Next we need a place to host the build using NGINX

FROM nginx:1.16.0-alpine

COPY --from=builder /client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
