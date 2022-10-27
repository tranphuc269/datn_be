FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .


RUN npm run build datn_chung_api

RUN npm prune

FROM node:16-alpine


WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY ./src/migrations ./src/migrations
COPY ./src/ormconfig.ts ./src/ormconfig.ts

RUN apk --no-cache add curl

EXPOSE 3000

USER node