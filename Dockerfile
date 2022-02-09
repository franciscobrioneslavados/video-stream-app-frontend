FROM node:14-alpine as build-stage
WORKDIR /app

COPY ./ /app/

RUN npm install --quiet

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf