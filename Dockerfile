FROM node:16-alpine

WORKDIR /src

COPY package*.json /src/

RUN npm install

RUN npm install -g typescript

COPY . /src/

ENV NODE_ENV=development

EXPOSE 3000

ENTRYPOINT ["npm", "start"]