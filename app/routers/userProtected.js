const wrap = require('co-express')

const express = require('express')
const axios = global.rootRequire('app/helpers/axios')

const ensureLoggedIn = global.rootRequire('app/auth/helpers/ensureLoggedIn.js')
const ensureLoggedOut = global.rootRequire('app/auth/helpers/ensureLoggedOut.js')
const mongoHelper = global.rootRequire('app/helpers/mongo.js')

module.exports = (app, handler) => {
  const protectedRouter = express.Router()

  protectedRouter.get('/login', ensureLoggedOut(), (req, res) => handler(req, res))

  protectedRouter.get('/dashboard/pollSettings/:id', ensureLoggedIn(), wrap(function * (req, res, next) {
    const pollRequest = yield (axios(`/api/poll/${req.params.id}`))
    const poll = pollRequest.data

    if (mongoHelper.checkMongoIdEql(poll.author, req.user.id)) {
      const params = req.params
      // Populate req to avoid another api request
      req.poll = poll
      app.render(req, res, '/dashboard/pollSettings', Object.assign(params, req.query))
    } else {
      res.sendStatus(404)
    }
  }))

  protectedRouter.get(/dashboard/, ensureLoggedIn(), (req, res) => handler(req, res))

  return protectedRouter
}
