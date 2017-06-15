const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (req.xhr) {
    res.status(500).json({ message: err.message })
  } else {
    res.status(500).end()
  }
}

module.exports = errorHandler
