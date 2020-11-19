// init env config
require('dotenv').config()

const global = require('./utils/global')
const { logger } = require('./logger')
const { bot, app } = require('./app')

global.setItem('app', app)

// process.on('unhandledRejection', (reason, p) =>
//   logger.error('Unhandled Rejection at: Promise ', p, reason)
// )

bot.prepare().then(() => {
  const port = app.get('port')
  const server = app.listen(port)
  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  )
})
