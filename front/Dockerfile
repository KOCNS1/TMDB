FROM node:16-alpine

EXPOSE 5173

WORKDIR /front

COPY . .

RUN npm ci --legacy-peer-deps

COPY . ./front

RUN npm run build

# FROM nginx:1.21.1

# COPY --from=build-stage /front/dist /usr/share/nginx/html
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
