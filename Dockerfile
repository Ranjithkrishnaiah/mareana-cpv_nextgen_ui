FROM node:12 as build

WORKDIR /app
COPY . .

#prepare the container for building react
RUN npm install --silent
RUN npm rebuild node-sass
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html


