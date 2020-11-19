// const PROFILE_ENDPOINT = 'https://graph.facebook.com/v7.0/me/messenger_profile'
const USER_ENDPOINT = 'https://graph.facebook.com/v7.0/me/custom_user_settings'

const POSTBACKS = [
  {
    title: '客滿通知',
    payload: 'ROOM_FULL'
  },
  {
    title: '取消客滿',
    payload: 'ROOM_AVA'
  }
]

// ref: https://developers.facebook.com/docs/messenger-platform/send-messages/persistent-menu
const MENU_CONFIG = {
  locale: 'default',
  composer_input_disabled: false,
  call_to_actions: [
    ...POSTBACKS.map(item => ({
      ...item,
      type: 'postback'
    })),
    {
      type: 'web_url',
      title: '看議程',
      url: 'https://summit.g0v.tw/2020/agenda/',
      webview_height_ratio: 'full'
    }
  ]
}

module.exports = {
  USER_ENDPOINT,
  POSTBACKS,
  MENU_CONFIG
}
