ARG EXPORT_DIR=/export

FROM node:20-alpine3.18 AS client-src
ARG SERVER_HOST_NAME=web-server
ARG SERVER_PORT=443
WORKDIR /usr/src/app
COPY frontend/package.json ./
RUN npm install
COPY frontend/. .
RUN sed -i -e "s/{{ SERVER_HOST_NAME }}/$SERVER_HOST_NAME/g" \
           -e "s/{{ SERVER_PORT }}/$SERVER_PORT/g" package.json

FROM client-src AS client-dev
ARG DEV_PORT=3000
EXPOSE $DEV_PORT
CMD [ "npm", "start" ]

FROM client-src AS client-build
ARG EXPORT_DIR
RUN npm run build
RUN mkdir $EXPORT_DIR \
 && mv build/* $EXPORT_DIR

FROM alpine:3.18 AS generate-cert
ARG EXPORT_DIR
RUN apk update \
 && apk add --no-cache openssl
WORKDIR $EXPORT_DIR
RUN openssl genrsa -out key.pem 2048
RUN openssl req -new \
            -subj "/C=SE/ST=M/O=Company Inc/CN=synonyms.com" \
            -key key.pem \
            -out csr.pem
RUN openssl x509 -req -days 365 -in csr.pem \
            -signkey key.pem \
            -out cert.pem

FROM node:20-alpine3.18 AS server
ARG EXPORT_DIR
ARG PORT=3000
WORKDIR /usr/src/app
COPY --from=generate-cert $EXPORT_DIR/. .
COPY backend/src/package.json .
RUN npm install
COPY backend/src/server.js .
EXPOSE $PORT
CMD [ "node", "server.js" ]

FROM server AS server-dev
COPY backend/src/index.html public/
#USER node
FROM server AS server-prod
COPY --from=client-build $EXPORT_DIR/. public/