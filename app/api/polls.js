const wrap = require('co-express')

const express = require('express')
const apiRouter = express.Router()

const ensureLoggedIn = global.rootRequire('app/auth/helpers/ensureLoggedIn.js')

const Poll = global.rootRequire('db/models/poll.js')

apiRouter.get('/', ensureLoggedIn(), wrap(function * (req, res, next) {
  const queryResult = yield (Poll.find({ author: req.user.id }).exec())

  if (queryResult === null) {
    yield Promise.reject(new Error('There is no poll for the current user.'))
  } else {
    res.status(200).json(queryResult)
  }
}))

module.exports = apiRouter
