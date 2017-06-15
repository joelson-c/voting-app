FROM node:8.0-alpine

ENV NODE_ENV=production

# Run Deps
RUN apk add --no-cache bash dumb-init

ADD package.json .babelrc /usr/src/voting-app/
WORKDIR /usr/src/voting-app

RUN npm install && npm cache clean --force

ADD app app/
ADD db db/
ADD utils utils/

RUN npm run build

RUN adduser -D nodejs
USER nodejs

ENTRYPOINT ["dumb-init", "--"]
CMD ["./utils/wait-for-it.sh", "db:27017", "--", "node", "./app/server.js"]