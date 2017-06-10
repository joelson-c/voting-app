const User = require('../api/models/user.js')

module.exports = function (passportRef) {
  passportRef.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passportRef.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}
