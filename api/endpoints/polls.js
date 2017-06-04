const async = require('asyncawait/async')
const __await__ = require('asyncawait/await')

const express = require('express')
const apiRouter = express.Router()

const ensureLoggedIn = require('../../auth/helpers/ensureLoggedIn.js')

const Poll = require('../models/poll.js')

apiRouter.get('/', ensureLoggedIn(), async((req, res, next) => {
  const queryResult = __await__(Poll.find({ author: req.user.id }).exec())

  if (queryResult === null) {
    throw new Error('There is no poll for the current user.')
  } else {
    res.status(200).json(queryResult)
  }
}))

module.exports = apiRouter
