FROM node:20-alpine3.18 AS client-src
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

FROM client-src AS client-dev
ARG DEV_PORT=3000
EXPOSE $DEV_PORT
CMD [ "npm", "start" ]

FROM client-src AS client-build
RUN npm run build