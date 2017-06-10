const express = require('express')
const apiRouter = express.Router()

const pollsEndpoint = require('../api/endpoints/polls.js')
const pollEndpoint = require('../api/endpoints/poll.js')
const userEndpoint = require('../api/endpoints/user.js')

apiRouter.get('/', (req, res) => {
  res.status(200).json({ data: 'pong' })
})

apiRouter.use('/polls', pollsEndpoint)
apiRouter.use('/poll', pollEndpoint)
apiRouter.use('/user', userEndpoint)

module.exports = apiRouter
