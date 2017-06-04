const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = mongoose.createConnection(process.env.DB_URL)

module.exports = db
