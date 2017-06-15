const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = global.rootRequire('db/models/user.js')
const sessionConfig = require('./sessionConfig.js')

const googleAuthConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || 'default',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'default'
  }, (accessToken, refreshToken, profile, cb) => {
    const findOrCreate = {
      name: profile.displayName,
      googleId: profile.id
    }

    User.findOrCreate(findOrCreate, (err, user) => cb(err, user))
  }
)

passport.use(googleAuthConfig)

// Init session configuration (serialize/deserialize)
sessionConfig(passport)

module.exports = passport
