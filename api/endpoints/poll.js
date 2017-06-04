const async = require('asyncawait/async')
const __await__ = require('asyncawait/await')

const express = require('express')
const apiRouter = express.Router()

const Poll = require('../models/poll.js')
const ensureLoggedIn = require('../../auth/helpers/ensureLoggedIn.js')
const mongoHelper = require('../../helpers/mongo.js')

/* poll endpoint */
apiRouter.route('/:id?')
.get(async((req, res, next) => {
  req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()

  try {
    const validationResult = __await__(req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id

    const queryResult = __await__(Poll.findOne({ _id }))

    if (queryResult === null) {
      throw new Error('There is no poll with the requested ID.')
    } else {
      res.status(200).json(queryResult)
    }
  } catch (e) {
    next(e)
  }
}))
.post(ensureLoggedIn(), async((req, res, next) => {
  req.checkBody('title', 'Invalid title').notEmpty()
  req.checkBody('options', 'Invalid poll options').isArray()

  req.sanitizeBody('title').trim()

  try {
    const validationResult = __await__(req.getValidationResult())
    validationResult.throw()

    const title = req.body.title
    const author = req.user.id
    const options = req.body.options

    const poll = new Poll({ title, author, options })

    __await__(poll.save())

    res.status(200).json({ message: 'Successfully created a new poll.' })
  } catch (e) {
    next(e)
  }
}))
.patch(ensureLoggedIn(), async((req, res, next) => {
  req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()
  req.checkBody('title', 'Invalid title').notEmpty()
  req.checkBody('options', 'Invalid poll options').isArray()

  req.sanitizeBody('title').trim()

  try {
    const validationResult = __await__(req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id
    const title = req.body.title
    const options = req.body.options

    const poll = __await__(Poll.findOne({ _id }))

    if (mongoHelper.checkMongoIdEql(poll.author, req.user.id)) {
      throw new Error('Unauthorized')
    }

    const updateCmds = {
      $set: { title, options }
    }

    __await__(Poll.findByIdAndUpdate(_id, updateCmds))

    res.status(200).json({ message: `Successfully modified the poll #${_id}` })
  } catch (e) {
    next(e)
  }
}))
.delete(ensureLoggedIn(), async((req, res, next) => {
  req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()

  try {
    const validationResult = __await__(req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id

    const poll = __await__(Poll.findOne({ _id }))

    if (mongoHelper.checkMongoIdEql(poll.author, req.user.id)) {
      throw new Error('Unauthorized')
    }

    __await__(Poll.remove({ _id }))

    res.status(200).json({ message: `Successfully deleted the poll #${_id}` })
  } catch (e) {
    next(e)
  }
}))

apiRouter.post('/vote/:id', async((req, res, next) => {
  req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()
  req.checkBody('option', 'Invalid option ID').notEmpty().isMongoId()

  try {
    const validationResult = __await__(req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id
    const optionId = req.body.option

    const whoHasVoted = req.isAuthenticated() ? req.user.id : req.ip

    const findCmds = {
      _id,
      options: {
        $elemMatch: { _id: optionId }
      },
      whoHasVoted: {
        $nin: [whoHasVoted]
      }
    }

    const updateCmds = {
      $inc: {
        'options.$.votes': 1
      },
      $push: {
        whoHasVoted
      }
    }

    const updateResult = __await__(Poll.findOneAndUpdate(findCmds, updateCmds, { passRawResult: true }))

    if (updateResult !== null) {
      res.status(200).json({ message: `Successfully voted on the poll #${_id}` })
    } else {
      throw new Error('There is no poll with the requested ID or the user has already voted in this poll.')
    }
  } catch (e) {
    next(e)
  }
}))

module.exports = apiRouter
