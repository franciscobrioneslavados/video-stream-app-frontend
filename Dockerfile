FROM node:14-alpine as build-stage
WORKDIR /app

COPY ./ /app/

RUN npm install --quiet

RUN npm run build

FROM nginxinc/nginx-unprivileged

COPY --from=build-stage /app/build/ /usr/share/nginx/html

RUN ls -la

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf