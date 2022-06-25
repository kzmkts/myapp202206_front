FROM node:16.15.1-alpine

ARG WORKDIR

ENV HOME=${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo 

WORKDIR ${HOME}

COPY package*.json .
RUN yarn install

COPY . .