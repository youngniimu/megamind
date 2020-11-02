# base image
FROM node:alpine

# workdir inside docker, to keep files in order
WORKDIR /app

# install dependencies first so docker wont build the whole image everytime we make changes to source files
COPY ./package.json ./
RUN npm install --only=prod

COPY ./ ./

CMD ["npm", "start"]
