FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY bin/ ./bin
COPY models ./models
COPY public ./public
COPY routes ./routes
COPY services ./services
COPY app.js .
COPY passport.js .
COPY dbapikey.js .
COPY dbusertest.js .
COPY dbuser.js .
COPY verifyJWTToken.js .
COPY .env .


EXPOSE 3333

CMD npm start 