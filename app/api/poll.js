const wrap = require('co-express')

const express = require('express')
const apiRouter = express.Router()

const Poll = global.rootRequire('db/models/poll.js')
const ensureLoggedIn = global.rootRequire('app/auth/helpers/ensureLoggedIn.js')
const mongoHelper = global.rootRequire('app/helpers/mongo.js')

/* poll endpoint */
apiRouter.route('/:id?')
  .get(wrap(function * (req, res, next) {
    req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()

    const validationResult = yield (req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id

    const queryResult = yield (Poll.findOne({ _id }))

    if (queryResult === null) {
      yield Promise.reject(new Error('There is no poll with the requested ID.'))
    } else {
      res.status(200).json(queryResult)
    }
  }))

  .post(ensureLoggedIn(), wrap(function * (req, res, next) {
    req.checkBody('title', 'Invalid title').notEmpty()
    req.checkBody('options', 'Invalid poll options').isArray()

    req.sanitizeBody('title').trim()

    const validationResult = yield (req.getValidationResult())
    validationResult.throw()

    const title = req.body.title
    const author = req.user.id
    const options = req.body.options

    const poll = new Poll({ title, author, options })

    yield (poll.save())

    res.status(200).json({ message: 'Successfully created a new poll.' })
  }))

  .patch(ensureLoggedIn(), wrap(function * (req, res, next) {
    req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()
    req.checkBody('title', 'Invalid title').notEmpty()
    req.checkBody('options', 'Invalid poll options').isArray()

    req.sanitizeBody('title').trim()
    const validationResult = yield (req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id
    const title = req.body.title
    const options = req.body.options

    const poll = yield (Poll.findOne({ _id }))

    if (mongoHelper.checkMongoIdEql(poll.author, req.user.id)) {
      const updateCmds = {
        $set: { title, options }
      }

      yield (Poll.findByIdAndUpdate(_id, updateCmds))

      res.status(200).json({ message: `Successfully modified the poll #${_id}` })
    } else {
      yield Promise.reject(new Error('Unauthorized'))
    }
  }))

  .delete(ensureLoggedIn(), wrap(function * (req, res, next) {
    req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()

    const validationResult = yield (req.getValidationResult())
    validationResult.throw()

    const _id = req.params.id

    const poll = yield (Poll.findOne({ _id }))

    if (mongoHelper.checkMongoIdEql(poll.author, req.user.id)) {
      yield (Poll.remove({ _id }))

      res.status(200).json({ message: `Successfully deleted the poll #${_id}` })
    } else {
      yield Promise.reject(new Error('Unauthorized'))
    }
  }))

apiRouter.post('/vote/:id', wrap(function * (req, res, next) {
  req.checkParams('id', 'Invalid ID').notEmpty().isMongoId()
  req.checkBody('option', 'Invalid option ID').notEmpty().isMongoId()

  const validationResult = yield (req.getValidationResult())
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

  const updateResult = yield (Poll.findOneAndUpdate(findCmds, updateCmds, { passRawResult: true }))

  if (updateResult !== null) {
    res.status(200).json({ message: `Successfully voted on the poll #${_id}` })
  } else {
    yield Promise.reject(new Error('There is no poll with the requested ID or the user has already voted in this poll.'))
  }
}))

module.exports = apiRouter
