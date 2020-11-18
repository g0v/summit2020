const { logger } = require('../logger')
const global = require('../utils/global')

// TODO: handle abort process

class StateHandler {
  constructor ({ msgKey, validator, sender }) {
    this.msgKey = msgKey
    this.validator = validator || this.defaultValidator
    this.sender = sender || this.defaultSender
  }

  defaultValidator (context, text) {
    return true
  }

  async defaultSender (context, headMsg) {
    await context.sendText(combineMsg(categoryCache[this.msgKey], headMsg))
  }
}

function combineMsg (msg, additionalMsg = '') {
  if (additionalMsg) {
    msg = `${additionalMsg}\n${msg}`
  }
  return msg
}

function setOnboardInfo (context, payload) {
  context.setState({
    onboardInfo: {
      ...context.state.onboardInfo,
      ...payload
    }
  })
}

const welcome = new StateHandler({
  msgKey: 'WELCOME'
})

const collectEmail = new StateHandler({
  msgKey: 'COLLECT_EMAIL',
  async validator (context, text) {
    text = (text || '').trim()
    if (!text) {
      return false
    }
    setOnboardInfo(context, { name: text })
    return true
  },
  async sender (...args) {
    await this.defaultSender(...args)
  }
})

const chooseFloor = new StateHandler({
  msgKey: 'CHOOSE_FLOOR',
  async validator (context, text) {
    if (!text || !emailValidator.validate(text)) {
      return '信箱似乎打錯囉\nReceive an invalid email\n'
    }
    setOnboardInfo(context, { email: text })
    return true
  },
  async sender (context, headMsg) {
    const app = global.getItem('app')
    const bookingService = app.service('booking')
    const floors = await bookingService.getFloors()
    setOnboardInfo(context, { floors })

    await context.sendText(combineMsg(categoryCache[this.msgKey], headMsg), {
      quickReplies: floors.map(floor => ({
        contentType: 'text',
        title: floor,
        payload: floor
      }))
    })
  }
})

const chooseRoomId = new StateHandler({
  msgKey: 'CHOOSE_ROOM_ID',
  async validator (context, text) {
    if (!text || !context.state.onboardInfo.floors.includes(text)) {
      return '錯誤的樓層\nInvalid floor number\n'
    }
    setOnboardInfo(context, { floor: text })
    return true
  },
  async sender (context, headMsg) {
    const app = global.getItem('app')
    const bookingService = app.service('booking')
    const rooms = await bookingService.getRoomsInFloor(
      context.state.onboardInfo.floor
    )
    setOnboardInfo(context, { rooms })
    await context.sendText(combineMsg(categoryCache[this.msgKey], headMsg), {
      quickReplies: rooms.map(room => ({
        contentType: 'text',
        title: room,
        payload: room
      }))
    })
  }
})

async function addOnboardedMsg (context, booking) {
  const info = context.state.onboardInfo
  const channelId = context.session.user.id
  const systemNotification = `${info.name} <${info.email}> 已經登記入住 ${booking.buildingId} ${booking.roomId} 囉！`

  const chatService = global.getItem('app').service('chat')
  await chatService.append({
    channelId,
    chatLog: new ChatLog({
      type: 'text',
      data: systemNotification
    }, 'system')
  })
}

async function notifySlack (booking) {
  const app = global.getItem('app')
  const bookingService = app.service('booking')
  const slackService = app.service('slack-hook')

  const sameEmailBooking = await bookingService.find({
    query: {
      email: booking.email
    }
  })
  const sameRoomBooking = await bookingService.find({
    query: {
      buildingId: booking.buildingId,
      roomId: booking.roomId
    }
  })
  const sameChannelBooking = await bookingService.find({
    query: {
      channelType: booking.channelType,
      channelId: booking.channelId
    }
  })

  const roomStr = `*${booking.buildingId} ${booking.roomId}*`
  const name = `*${booking.username}*`
  const nEmailDup = sameEmailBooking.total
  const nRoomDup = sameRoomBooking.total
  const nChannelDup = sameChannelBooking.total

  let slackMsg = `室友 ${name} 已成功註冊到 ${roomStr} ！`

  if (nEmailDup > 1 || nRoomDup > 1 || nChannelDup > 1) {
    slackMsg = []
    if (nEmailDup > 1) {
      slackMsg.push(`用同信箱註冊了 ${nEmailDup} 次`)
    }
    if (nChannelDup > 1) {
      slackMsg.push(`用同臉書帳號登記了 ${nChannelDup} 次`)
    }
    if (nRoomDup > 1) {
      slackMsg.push(`該房間共有 ${nRoomDup} 人入住`)
    }
    slackMsg = slackMsg.join('，而且')
    slackMsg = `室友 ${name} 已註冊到 ${roomStr} ，但` + slackMsg + ' (◕‿◕)'
  }

  await slackService.create({
    msg: slackMsg,
    channel: '*'
  }, {
    provider: 'server'
  })
}

const confirmInfo = new StateHandler({
  msgKey: 'CONFIRM_INFO',
  async validator (context, text) {
    if (!text || !context.state.onboardInfo.rooms.includes(text)) {
      return '錯誤的房間\nInvalid room number\n'
    }
    setOnboardInfo(context, { room: text })
    return true
  },
  async sender (context) {
    const app = global.getItem('app')
    const bookingService = app.service('booking')
    const info = context.state.onboardInfo
    const currentBookings = await bookingService.find({
      query: {
        roomId: info.room,
        $limit: 1,
        $sort: {
          updatedAt: -1
        }
      }
    })
    const userProfile = await context.getUserProfile()

    let bookingId = ''
    const channelId = context.session.user.id
    const newBooking = {
      buildingId: '萬華 Wanhua',
      floor: info.floor,
      roomId: info.room,
      username: info.name,
      email: info.email,
      channelType: 'facebook',
      channelId,
      channelMeta: userProfile
    }
    if (currentBookings.total > 0) {
      const current = currentBookings.data[0]
      if (!current.email) {
        bookingId = current.id
      }
    }
    let bookingRow = null
    if (!bookingId) {
      bookingRow = await bookingService.create(newBooking, { provider: 'server' })
    } else {
      bookingRow = await bookingService.patch(bookingId, newBooking, { provider: 'server' })
    }

    await context.sendText(categoryCache[this.msgKey])
    await addOnboardedMsg(context, newBooking)
    await notifySlack(newBooking)

    context.setState({
      // done! avoid step+=
      onboardStep: -2,
      bookingInfo: bookingRow.valueOf(),
      noBooking: false
    })
  }
})

const onboardStates = [
  welcome,
  collectEmail,
  chooseFloor,
  chooseRoomId,
  confirmInfo
]

const TRIGGER = 'trigger'

async function onboardHandler (context, { next }) {
  const ev = context.event
  if (ev.isReferral && ev.ref === TRIGGER) {
    context.setState({
      onboardStep: 0
    })
  } else if (ev.isText && ev.text === TRIGGER) {
    // temp workaround for abort
    if (context.state.onboardStep > 0) {
      context.setState({
        onboardStep: -1,
        onboardInfo: null
      })
      context.sendText('Request aborted')
    } else {
      context.setState({
        onboardStep: 0
      })
    }
  }
  if (context.state.onboardStep < 0 || ev.isDelivery) {
    return next
  }

  if (!ev.isText) {
    await context.sendText('我只看得懂文字呦\nPlease type text instead of figure (◕‿◕)')
  }
}

module.exports = onboardHandler
