const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const { POSTBACKS } = require('../utils/fbMenu')
const locations = require('../utils/location.json').filter(item => !item['場地-華語'].startsWith('ALL'))
const global = require('../utils/global')

dayjs.extend(utc)
dayjs.extend(timezone)

const AVAILABLE_PAYLOAD = POSTBACKS.reduce((sum, item) => {
  sum[item.payload] = true
  return sum
}, {})

const AVAILABLE_TIMEOUT_MIN = [10, 20, 30, 60, 90]

const TIMEOUT_SELECTIONS = {
  quickReplies: AVAILABLE_TIMEOUT_MIN.map((min) => {
    return {
      contentType: 'text',
      title: `${min} 分後`,
      payload: min
    }
  })
}

const ROOM_ABBR = {
  成大綠色魔法學校: '綠色',
  ' 成大創意基地': '',
  '臺南市美術館 2 館 - 跨域展演廳': '南美館',
  '吳園藝文中心 - 原台南公會堂': '吳園'
}

function shortRoomName (room) {
  let zh = room['場地-華語']
  for (const key in ROOM_ABBR) {
    if (zh.includes(key)) {
      zh = zh.replace(key, ROOM_ABBR[key])
    }
  }
  return zh.replace(/ - /g, '-').replace(/-第 .*\)/, '')
}

const ROOM_SELECTIONS = {
  quickReplies: locations.map((room) => {
    return {
      contentType: 'text',
      title: shortRoomName(room),
      payload: room.id
    }
  })
}

async function handleMenuButton (context, payload) {
  const postback = context.event.postback
  await context.setState({
    roomActionType: payload || postback.payload
  })
  await context.sendText('請選擇場地：', ROOM_SELECTIONS)
}

async function resetState (context) {
  await context.setState({
    room: null,
    roomActionType: ''
  })
}

async function collectTimeoutInfo (context, ans) {
  ans = ans || Number.parseInt(context.event.quickReply.payload)
  const state = context.state
  const targetRoom = state.room

  if (!AVAILABLE_TIMEOUT_MIN.includes(ans)) {
    await context.sendText('多久後要取消客滿狀態？', TIMEOUT_SELECTIONS)
    return
  }

  const timeOutAt = dayjs().add(ans, 'minute')
  const timeOutAtTwStr = timeOutAt.tz('Asia/Taipei').format('HH:mm')
  const isSuccess = await createLog(context, {
    element: targetRoom.id,
    timeOutAt: timeOutAt.toDate(),
    value: { isFull: true }
  })
  if (isSuccess) {
    await context.sendText(`${targetRoom['場地-華語']} 已標為客滿， ${timeOutAtTwStr} 時復原`)
  }
  await resetState(context)
}

async function createLog (context, payload) {
  const channelId = context.session.user.id
  const app = global.getItem('app')
  const memberService = app.service('member')
  const logService = app.service('element-log')

  const members = await memberService.find({
    query: {
      channelType: 'messenger',
      channelId
    },
    provider: 'server',
    paginate: false
  })
  if (!members.length) {
    await context.sendText('請先登記為工人後，才能通報呦～')
    return false
  }
  return logService.create({
    ...payload,
    memberId: members[0].id
  }, {
    provider: 'server'
  })
}

async function collectRoomInfo (context, ans) {
  ans = ans || context.event.quickReply.payload
  const state = context.state
  const targetRoom = locations.find(room => room.id === ans)
  if (!targetRoom) {
    await context.sendText('請選擇場地', ROOM_SELECTIONS)
    return
  }
  if (state.roomActionType === 'ROOM_AVA') {
    // reset room
    const isSuccess = await createLog(context, {
      element: targetRoom.id,
      timeOutAt: 0,
      value: { isFull: false }
    })
    if (isSuccess) {
      await context.sendText(`${targetRoom['場地-華語']} 已取消客滿`)
    }
    await resetState(context)
  } else {
    // ask for timeout
    context.setState({
      room: targetRoom
    })
    await context.sendText('多久後要取消客滿狀態？', TIMEOUT_SELECTIONS)
  }
}

async function menuHandler (context, { next }) {
  const ev = context.event
  if (ev.isDelivery) {
    return next
  }

  if (context.event.isPostback) {
    const postback = context.event.postback
    if (!AVAILABLE_PAYLOAD[postback.payload]) {
      return next
    }
    await handleMenuButton(context)
  } else if (context.state.roomActionType && ev.isQuickReply) {
    if (context.state.room) {
      await collectTimeoutInfo(context)
    } else {
      await collectRoomInfo(context)
    }
  } else if (ev.isQuickReply && AVAILABLE_PAYLOAD[ev.quickReply.payload]) {
    await handleMenuButton(context, ev.quickReply.payload)
  } else if (context.state.roomActionType && ev.isText) {
    // also accept partial plain text
    const text = ev.text
    if (context.state.room) {
      const ans = AVAILABLE_TIMEOUT_MIN.find((timeout) => {
        return text.includes(`${timeout}`)
      })
      if (ans) {
        await collectTimeoutInfo(context, ans)
      } else {
        return next
      }
    } else {
      const cleanText = text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ')
      const ans = locations.find((room) => {
        return ['場地-華語', '場地-en', 'id'].some((key) => {
          const value = room[key].toLowerCase()
          return cleanText.some(t => value.includes(t))
        })
      })
      if (ans) {
        await collectRoomInfo(context, ans.id)
      } else {
        return next
      }
    }
  } else {
    return next
  }
}

module.exports = menuHandler
