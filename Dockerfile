FROM node:8.0-alpine

ENV NODE_ENV=production

# Run Deps
RUN apk add --no-cache bash dumb-init

ADD package.json yarn.lock .babelrc /usr/src/voting-app/
WORKDIR /usr/src/voting-app

RUN yarn install --pure-lockfile && \
    yarn cache clean

COPY app app/

RUN yarn run build

CMD ["dumb-init", "node", "./app/server.js"]