# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:12.13.1-alpine as build-stage

# workdir inside docker, to keep files in order
WORKDIR /app

# install dependencies first so docker wont build the whole image everytime we make changes to source files
COPY ./package.json ./
RUN npm install

COPY ./ ./

# CMD ["npm", "start"]
RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
