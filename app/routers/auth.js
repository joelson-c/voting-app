const express = require('express')
const google = require('../auth/google.js')

const authRouter = express.Router()

authRouter.get('/google', google.authenticate('google', { scope: ['profile'] }))

authRouter.get('/google/callback', google.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.cookie('name', req.user.name)
  res.redirect('/dashboard')
})

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.clearCookie('name')

  res.redirect('/')
})

module.exports = authRouter
