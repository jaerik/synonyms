FROM node:20-alpine3.18
ARG PORT=3000
WORKDIR /usr/src/app
COPY src/package.json .
RUN npm install
COPY src/server.js .
EXPOSE $PORT
CMD [ "node", "server.js" ]