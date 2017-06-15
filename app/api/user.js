const express = require('express')
const methodOverride = require('method-override')
const apiRouter = express.Router()

const User = global.rootRequire('db/models/user.js')
const ensureLoggedIn = global.rootRequire('app/auth/helpers/ensureLoggedIn.js')

apiRouter.use(methodOverride('_method'))

apiRouter.route('/')
  .get(ensureLoggedIn(), (req, res) => {
    res.status(200).json(req.user)
  })
  .delete(ensureLoggedIn(), (req, res) => {
    const Poll = global.rootRequire('db/models/poll.js')

    // Remove all polls created by this user
    Poll.deleteMany({ author: req.user.id }).exec()

    User.findByIdAndRemove(req.user.id).exec()

    res.redirect('/auth/logout')
  })

module.exports = apiRouter
