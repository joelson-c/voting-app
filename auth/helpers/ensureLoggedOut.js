module.exports = (userRedirectUrl) => {
  return (req, res, next) => {
    const redirectUrl = userRedirectUrl || '/dashboard'
    const isAjax = req.xhr

    if (req.isAuthenticated()) {
      if (isAjax) {
        res.sendStatus(401)
      } else {
        res.redirect(303, redirectUrl)
      }
    } else {
      next()
    }
  }
}
