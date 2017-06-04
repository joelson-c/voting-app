const mongoose = require('mongoose')
const db = require('../dbConnect.js')

const Schema = mongoose.Schema

const pollOptionsSchema = new Schema({
  name: { type: String, required: true },
  votes: { type: Number, min: 0, default: 0 }
})

const pollSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  options: [pollOptionsSchema],
  whoHasVoted: [String]
})

const pollModel = db.model('Poll', pollSchema)

module.exports = pollModel
