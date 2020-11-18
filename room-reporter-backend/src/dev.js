const ngrok = require('ngrok')
const path = require('path')
const { logger } = require('./logger')

const bottenderConfig = require(path.join(__dirname, 'bot/bottender.config'))
const { app } = require('./app')
const port = app.get('port');

(async function () {
  const url = await ngrok.connect(port)
  logger.info(`[Ngrok] public url: ${url}`)
  Object.keys(bottenderConfig.channels).forEach((channel) => {
    const config = bottenderConfig.channels[channel]
    if (!config.enabled) {
      return
    }
    logger.info(`[Ngrok] ${channel} callback: ${url}${config.path}`)
  })
})()
