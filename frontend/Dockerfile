FROM node:12-alpine AS build

WORKDIR /opt/payback-front/

COPY package.json yarn.lock ./
RUN yarn install

COPY src/ ./src/
COPY public/ ./public/
RUN yarn build

FROM nginx:alpine

COPY --from=build /opt/payback-front/build/ /usr/share/nginx/html/
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
