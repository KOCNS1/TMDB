FROM node:16 as build

WORKDIR /usr/app
COPY . /usr/app

RUN npm ci --legacy-peer-deps
RUN npm run build
RUN apt update && apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN npm run cy:e2e


FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html