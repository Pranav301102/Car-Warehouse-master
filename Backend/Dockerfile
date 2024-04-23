# Debian’s slim distribution 
FROM node:16.17.0-bullseye-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]