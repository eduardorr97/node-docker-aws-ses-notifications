FROM node:8.15.0-alpine as base
RUN mkdir -p /usr/src
WORKDIR /usr/src/
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --verbose && npm cache clean --force
COPY . .
CMD [ "npm", "start" ]
