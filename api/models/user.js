const mongoose = require('mongoose')
const db = require('../dbConnect.js')

const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: {
    type: String,
    validate: {
      validator (value) {
        return /.+@.+/.test(value)
      },
      message: '{VALUE} is not a valid email!'
    }
  }
})

const userModel = db.model('User', userSchema)

module.exports = userModel
