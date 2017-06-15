require('./globals.js')

// Lodash utils
const isEmpty = require('lodash.isempty')
const isPlainObject = require('lodash.isplainobject')

const express = require('express')
const next = require('next')
const passport = require('passport')

// Routing
const userProtectedRouter = require('./routers/userProtected.js')
const apiRouter = require('./routers/api.js')
const authRouter = require('./routers/auth.js')

const errorHandler = require('./errorHandler.js')

// Next
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev, dir: __dirname})
const handle = app.getRequestHandler()

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

app.prepare()
.then(() => {
  const server = express()

  server.enable('trust proxy')

  // General middlewares
  server.use(require('body-parser').json())
  server.use(require('express-validator')({ customValidators }))

  server.use(require('express-mongo-sanitize')())

  // Passport
  server.use(require('express-session')({
    secret: process.env.SECRET_KEY || 'default', resave: true, saveUninitialized: true, name: 'user_session'
  }))
  server.use(passport.initialize())
  server.use(passport.session())

  // Routing
  server.use('/api', apiRouter)
  server.use('/auth', authRouter)

  server.use('/', userProtectedRouter(app, handle))

  server.get('/poll/:id', (req, res, next) => {
    const params = req.params
    app.render(req, res, '/poll', Object.assign(params, req.query))
  })

  server.get('*', (req, res) => handle(req, res))

  server.use(errorHandler)

  const http = server.listen(process.env.PORT || '3000', (err) => {
    if (err) throw err

    console.log('Listening on port 3000!')
  })

  process.on('SIGTERM', () => {
    if (isEmpty(process.env.NODE_ENV) || process.env.NODE_ENV === 'development') return process.exit(0)

    http.close(() => {
      process.exit(0)
    })
  })
}).catch((reason) => console.error(reason))
