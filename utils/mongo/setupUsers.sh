#!/bin/sh
echo "Creating mongo users..."

mongo ${MONGO_APP_DATABASE} --host localhost --authenticationDatabase admin --authenticationMechanism SCRAM-SHA-1 \
  -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} \
  --eval \
  "db.createUser({user: '${MONGO_APP_USERNAME}', pwd: '${MONGO_APP_PASSWORD}', roles: [{role: 'readWrite', db: '${MONGO_APP_DATABASE}'}]});"

echo "Mongo users have been created..."