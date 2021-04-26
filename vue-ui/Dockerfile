FROM node:15

WORKDIR /usr/src/app/vue-ui

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]