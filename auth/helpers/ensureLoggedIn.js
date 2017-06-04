module.exports = (userRedirectUrl) => {
  return (req, res, next) => {
    const redirectUrl = userRedirectUrl || '/login'
    const isAjax = req.xhr

    if (req.isAuthenticated()) {
      next()
    } else {
      if (isAjax) {
        res.sendStatus(401)
      } else {
        res.redirect(303, redirectUrl)
      }
    }
  }
}
