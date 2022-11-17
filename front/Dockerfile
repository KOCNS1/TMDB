FROM node:16.17.1-alpine3.16 as build

WORKDIR /front

COPY . .

RUN npm ci --legacy-peer-deps

COPY . ./front

RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /front/dist /usr/share/nginx/html