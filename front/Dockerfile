FROM node:16 as build

WORKDIR /usr/app
COPY . /usr/app


FROM build as test
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run cy:e2e


FROM build as prod
RUN npm ci --legacy-peer-deps
RUN npm run build
COPY . .

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html