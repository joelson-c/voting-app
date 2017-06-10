const isEmpty = require('lodash.isempty')

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (isEmpty(err.array) === false) {
    console.log(err.array())
  }

  if (req.xhr) {
    res.status(500).json({ message: err.message })
  } else {
    res.sendStatus(500)
  }
}

module.exports = errorHandler
