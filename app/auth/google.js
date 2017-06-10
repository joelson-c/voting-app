const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../api/models/user.js')
const sessionConfig = require('./sessionConfig.js')

const googleAuthConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || 'default',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'default'
  },
  function (accessToken, refreshToken, profile, cb) {
    const searchFilter = {
      name: profile.displayName
    }

    const updateFields = {
      $set: {
        name: profile.displayName,
        googleId: profile.id
      }
    }

    const options = {
      upsert: true
    }

    User.findOneAndUpdate(searchFilter, updateFields, options, function (err, user) {
      return cb(err, user)
    })
  }
)

passport.use(googleAuthConfig)

// Init session configuration (serialize/deserialize)
sessionConfig(passport)

module.exports = passport
