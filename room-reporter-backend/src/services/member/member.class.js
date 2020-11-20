const axios = require('axios')
const { Service } = require('feathers-sequelize')
const { logger } = require('../../logger')
const { USER_ENDPOINT, MENU_CONFIG } = require('../../utils/fbMenu')

exports.Member = class Member extends Service {
  setup (app) {
    this.app = app
  }

  async create (data, params) {
    const resp = await super.create(data, params)
    const fbToken = this.app.get('fbAccessToken')
    const fbid = data.channelId
    const endpoint = `${USER_ENDPOINT}?access_token=${fbToken}`
    const payload = {
      psid: fbid,
      persistent_menu: [MENU_CONFIG]
    }
    try {
      await axios.post(endpoint, payload)
    } catch (error) {
      logger.error(`Failed create user menu for user ${fbid} - ${JSON.stringify(payload)}. because ${error.message}`)
    }
    return resp
  }
}
