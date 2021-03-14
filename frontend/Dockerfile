FROM node:14.13.1-alpine

WORKDIR /

ENV PATH /node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=true

COPY package.json yarn.lock ./
RUN yarn --silent
RUN apk update && apk add bash

COPY . ./

CMD ["yarn", "start"]