const async = require('asyncawait/async')
const __await__ = require('asyncawait/await')

const express = require('express')
const axios = require('../helpers/axios')

const ensureLoggedIn = require('../auth/helpers/ensureLoggedIn.js')
const ensureLoggedOut = require('../auth/helpers/ensureLoggedOut.js')
const mongoHelper = require('../helpers/mongo.js')

module.exports = (app, handler) => {
  const protectedRouter = express.Router()

  protectedRouter.get('/login', ensureLoggedOut(), (req, res) => handler(req, res))

  protectedRouter.get('/dashboard/pollSettings/:id', ensureLoggedIn(), async((req, res, next) => {
    try {
      const pollRequest = __await__(axios(`/api/poll/${req.params.id}`))
      const poll = pollRequest.data

      if (mongoHelper.checkMongoIdEql(poll.author, req.user.id)) {
        res.sendStatus(404)
      } else {
        const params = req.params
        // Populate req to avoid another api request
        req.poll = poll
        app.render(req, res, '/dashboard/pollSettings', Object.assign(params, req.query))
      }
    } catch (e) {
      next(e)
    }
  }))

  protectedRouter.get(/dashboard/, ensureLoggedIn(), (req, res) => handler(req, res))

  protectedRouter.get('/dashboard', (req, res) => handler(req, res))

  return protectedRouter
}
