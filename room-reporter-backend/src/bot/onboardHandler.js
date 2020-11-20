const { logger } = require('../logger')
const global = require('../utils/global')

async function registerMember (context) {
  let userProfile = { id: context.session.user.id }
  try {
    userProfile = await context.getUserProfile()
  } catch (err) {
    logger.error(`Failed to get user profile: ${userProfile.id} because ${err.message}`)
  }
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
  console.warn('onboard debug', ev.isReferral, ev.ref, ev.text)
  if (context.state.isOnReferral && ev.isText) {
    const app = global.getItem('app')
    const passPhrase = app.get('onboardPassphrase')
    if (ev.text.trim() === passPhrase) {
      context.setState({
        isOnReferral: false,
        hasOnboard: true
      })
      await registerMember(context)
      await context.sendText('答對了！請等我一分鐘更新選單，電腦版請重新整理網頁，之後就能回報場地狀況囉 ∩﹏∩')
    } else {
      await context.sendText('不對呦，而且如果一直沒打對的話，你就永遠離不開這裡惹 ⊙﹏⊙')
    }
  } else if (!context.state.hasOnboard) {
    const userId = context.session.user.id
    const app = global.getItem('app')
    const memberService = app.service('member')
    const members = await memberService.find({
      query: {
        channelType: 'messenger',
        channelId: userId
      },
      provider: 'server',
      paginate: false
    })
    if (!members.length) {
      await context.sendText('歡迎光臨，請輸灑密入通關蜜語，才能啟用機器人～')
      context.setState({
        isOnReferral: true
      })
    } else {
      context.setState({
        hasOnboard: true
      })
      return next
    }
  } else {
    return next
  }
}

module.exports = onboardHandler
