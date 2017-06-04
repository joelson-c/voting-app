const express = require('express')
const apiRouter = express.Router()

apiRouter.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user)
  } else {
    res.status(404).json({ message: 'The user has been not found.' })
  }
})

module.exports = apiRouter
