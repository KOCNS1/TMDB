FROM node:16 as build

WORKDIR /usr/app
COPY . /usr/app

RUN npm ci --legacy-peer-deps

ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html