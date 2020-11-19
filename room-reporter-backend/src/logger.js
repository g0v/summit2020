const { createLogger, format, transports } = require('winston')
const Sentry = require('winston-transport-sentry-node').default
const { FeathersError } = require('@feathersjs/errors')
const express = require('@feathersjs/express')

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const theTransports = [
  new transports.Console()
]

if (process.env.SENTRY_DSN) {
  theTransports.push(new Sentry({ level: 'warn' }))
}

const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  // level: process.env === 'production' ? 'info' : 'debug',
  level: 'debug',
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: theTransports
})

function expressHandler (err, req, res, next) {
  if (!(err instanceof FeathersError)) {
    logger.error(err)
  } else {
    logger.warn(err)
  }

  return express.errorHandler({ logger })(
    err,
    req,
    res,
    next
  )
  // FeathersError
}

module.exports = {
  logger,
  expressHandler
}
