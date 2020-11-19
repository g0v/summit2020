const axios = require('axios')
const { Service } = require('feathers-sequelize')
const { loggers } = require('winston')

// const PROFILE_ENDPOINT = 'https://graph.facebook.com/v7.0/me/messenger_profile'
const USER_ENDPOINT = 'https://graph.facebook.com/v7.0/me/custom_user_settings'

// ref: https://developers.facebook.com/docs/messenger-platform/send-messages/persistent-menu
const MENU_CONFIG = {
  locale: 'default',
  composer_input_disabled: false,
  call_to_actions: [
    {
      type: 'postback',
      title: '客滿通知',
      payload: 'ROOM_FULL'
    },
    {
      type: 'postback',
      title: '取消客滿',
      payload: 'ROOM_AVA'
    },
    {
      type: 'web_url',
      title: '看議程',
      url: 'https://summit.g0v.tw/2020/agenda/',
      webview_height_ratio: 'full'
    }
  ]
}

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
      loggers.error(`Failed create user menu for user ${fbid} - ${JSON.stringify(payload)}.`, error)
    }
    return resp
  }
}
