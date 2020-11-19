// const { logger } = require('../logger')
const global = require('../utils/global')

const TRIGGER = 'OLA_G0V_SUMMIT_2020'

async function registerMember (context) {
  const userProfile = await context.getUserProfile()
  const app = global.getItem('app')
  const memberService = app.service('member')
  const targetMembers = await memberService.find({
    query: {
      channelType: 'messenger',
      channelId: userProfile.id
    },
    provider: 'server',
    paginate: false
  })
  const newData = {
    channelType: 'messenger',
    channelId: userProfile.id,
    username: userProfile.name,
    profile: userProfile
  }
  if (targetMembers.length) {
    const memberId = targetMembers[0].id
    await memberService.update(memberId, newData, {
      provider: 'server'
    })
  } else {
    await memberService.create(newData, {
      provider: 'server'
    })
  }
}

async function onboardHandler (context, { next }) {
  const ev = context.event
  if (ev.isDelivery) {
    return next
  }

  if (ev.isReferral && ev.ref === TRIGGER) {
    await context.sendText('歡迎光臨，請輸灑密入通關蜜語，才能啟用機器人～')
    context.setState({
      isOnReferral: true
    })
  } else if (context.state.isOnReferral && ev.isText) {
    const app = global.getItem('app')
    const passPhrase = app.get('onboardPassphrase')
    if (ev.text.trim() === passPhrase) {
      // TODO: register user, create menu
      context.setState({
        isOnReferral: false
      })
      await context.sendText('答對了！請等我一分鐘更新選單，之後就能回報場地狀況囉 ∩﹏∩')
      await registerMember(context)
    } else {
      await context.sendText('不對呦，而且如果一直沒打對的話，你就永遠離不開這裡惹 ⊙﹏⊙')
    }
  } else {
    return next
  }
}

module.exports = onboardHandler
