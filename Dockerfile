FROM node:8.0-alpine

ENV NODE_ENV=production

# Run Deps
RUN apk add --no-cache bash dumb-init

ADD package.json yarn.lock .babelrc /usr/src/voting-app/
WORKDIR /usr/src/voting-app
ADD utils utils/

RUN yarn install --pure-lockfile && \
    yarn cache clean

COPY app app/
COPY db db/

RUN yarn run build

RUN adduser -D nodejs
USER nodejs

ENTRYPOINT ["dumb-init", "--"]
CMD ["./utils/wait-for-it.sh", "mongo:27017", "--", "node", "./app/server.js"]