const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (req.xhr) {
    res.status(500).json({ message: err.message })
  } else {
    res.sendStatus(500)
  }
}

module.exports = errorHandler
