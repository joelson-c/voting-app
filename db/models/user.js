const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const db = require('../')

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

userSchema.plugin(findOrCreate)

const userModel = db.model('User', userSchema)

module.exports = userModel
