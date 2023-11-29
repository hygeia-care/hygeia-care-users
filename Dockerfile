FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY bin/ ./bin
COPY models ./models
COPY public ./public
COPY routes/ ./routes
COPY app.js .

EXPOSE 3000

CMD npm start 