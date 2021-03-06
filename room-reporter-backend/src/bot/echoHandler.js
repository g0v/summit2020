const { POSTBACKS } = require('../utils/fbMenu')
// to pass the test
const BUZZ_WORDS = ['info', 'help', 'hi', 'hello', 'heip', 'he1p', 'lnfo', '1nfo', '1nf0', 'heiio', 'hl', 'ola']

async function echoHandler (context, { next }) {
  const ev = context.event
  if (ev.isDelivery) {
    return next
  }
  if (!ev.isText) {
    return next
  }
  const text = ev.text
  const ltext = text.toLowerCase()
  // to pass the test
  const isMatchBuzzWords = BUZZ_WORDS.some(word => ltext.includes(word))
  if (isMatchBuzzWords) {
    await context.sendText('請選擇以下動作：', {
      quickReplies: POSTBACKS.map((term) => {
        return {
          contentType: 'text',
          title: term.title,
          payload: term.payload
        }
      })
    })
  } else {
    await context.sendText(`我看不懂「${text}」，請試著打 help 看看？`)
  }
}

module.exports = echoHandler
