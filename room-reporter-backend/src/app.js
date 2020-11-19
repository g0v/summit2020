// const path = require('path')
// const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const { bottender } = require('bottender')
const socketio = require('@feathersjs/socketio')
const { logger, expressHandler } = require('./logger')

const sequelize = require('./sequelize')

// setup log
const app = express(feathers())
// const Sentry = require('@sentry/node')

// if (process.env.SENTRY_DSN) {
//   Sentry.init({ dsn: process.env.SENTRY_DSN })
//   // The request handler must be the first middleware on the app
//   app.use(Sentry.Handlers.requestHandler())
// }

// require feathers.js
const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())

const corsOptions = {
  origin: app.get('clientEndpoints').split(',')
}

app.use(cors(corsOptions))

app.use(compress())
app.use(express.json({
  verify: (req, _, buf) => {
    req.rawBody = buf.toString()
  }
}))
app.use(express.urlencoded({ extended: true }))

// Host the public folder
app.use('/', express.static(app.get('public')))

// setup bottender
const bot = bottender({
  dev: process.env.NODE_ENV !== 'production'
})
const botHandler = bot.getRequestHandler()
const botRouter = express.Router()

botRouter.all('/webhooks/*', (req, res) => {
  logger.info(`[${req.method}] ${req.path}`)
  return botHandler(req, res)
})

app.use(botRouter)

// Set up Plugins and providers
app.configure(express.rest())

// Setup websocket
app.configure(socketio())

app.configure(sequelize)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())

app.use(expressHandler)

app.hooks(appHooks)

module.exports = { bot, app }
