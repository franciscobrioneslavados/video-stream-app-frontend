FROM node:12-alpine as build-stage
WORKDIR /app

COPY ./ /app/

RUN npm install --quiet

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html

CMD ls -la

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf