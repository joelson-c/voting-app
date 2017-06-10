const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const serveruri = `mongodb://${process.env.DB_URL || 'mongodb://localhost/votingApp'}`

const db = mongoose.createConnection(serveruri)

module.exports = db
