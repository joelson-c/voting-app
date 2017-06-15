const User = global.rootRequire('db/models/user.js')

module.exports = (passportRef) => {
  passportRef.serializeUser((user, done) => done(null, user.id))

  passportRef.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
