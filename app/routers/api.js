const express = require('express')
const fs = require('mz/fs')
const path = require('path')

const apiRouter = express.Router()

const apiPath = path.join(global.currentRootDir, 'app', 'api')

fs.readdir(apiPath).then((files) => {
  files.forEach((file) => {
    apiRouter.use(`/${path.basename(file, '.js')}`, require(path.join(apiPath, file)))
  })
}).catch(err => { throw err })

module.exports = apiRouter
