FROM node:18-alpine

WORKDIR /app

RUN apk add git libstdc++ libc6-compat curl bash

RUN mkdir -p /app/node_modules /app/.vite \
    && chown -R node:node /app

USER node

COPY --chown=node:node package.json ./

RUN npm install --legacy-peer-deps

COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm", "run", "dev"]