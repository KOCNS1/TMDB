FROM node:16 as build

WORKDIR /usr/app
COPY . /usr/app

ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GOOGLE_CLIENT_SECRET
ARG VITE_BASE_URL

ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_SECRET=$VITE_GOOGLE_CLIENT_SECRET
ENV VITE_BASE_URL=$VITE_BASE_URL


RUN npm ci --legacy-peer-deps
RUN npm run build
RUN apt update && apt install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
# && rm -rf /var/lib/apt/lists/*
RUN npm run cy:e2e


FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html