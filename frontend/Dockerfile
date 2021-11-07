FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf
COPY --from=build-stage ./usr/src/app/build /usr/share/nginx/html/homepage
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]