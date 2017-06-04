// Dotenv
require('dotenv').config()

const isEmpty = require('lodash.isempty')
const isPlainObject = require('lodash.isplainobject')

const express = require('express')
const next = require('next')
const passport = require('passport')

const errorHandler = require('./api/errorHandler.js')

// Routing
const userProtectedRouter = require('./routers/userProtected.js')
const apiRouter = require('./routers/api.js')
const authRouter = require('./routers/auth.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.set('trust proxy', '127.0.0.1')

  // Express custom validators
  const customValidators = {
    isArray (value) {
      return Array.isArray(value)
    },

    hasLeastOneObject (array) {
      if (isEmpty(array) && this.isArray(array)) {
        return false
      } else if (this.isArray(array)) {
        return array.find((elem) => isPlainObject(elem) === false) === undefined
      } else {
        return false
      }
    }
  }

  server.use(require('body-parser').json())
  server.use(require('express-validator')({ customValidators }))

  // Passport
  server.use(require('express-session')({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true, name: 'user_session' }))
  server.use(passport.initialize())
  server.use(passport.session())

  server.use('/api', apiRouter)
  server.use('/auth', authRouter)

  server.use(errorHandler)

  server.use('/', userProtectedRouter(app, handle))

  server.get('/poll/:id', (req, res, next) => {
    const params = req.params
    app.render(req, res, '/poll', Object.assign(params, req.query))
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, (err) => {
    if (err) throw err

    console.log('Listening on port 3000!')
  })
}).catch((reason) => console.error(reason))
