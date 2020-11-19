const { POSTBACKS } = require('../utils/fbMenu')
// to pass the test
const BUZZ_WORDS = ['info', 'help', 'hi', 'hello', 'heip', 'he1p', 'lnfo', '1nfo', '1nf0', 'heiio', 'hl', 'ola']

async function echoHandler (context, { next }) {
  const ev = context.event
  if (ev.isDelivery) {
    return next
  }
  const text = ev.text.toLowerCase()
  // to pass the test
  const isMatchBuzzWords = BUZZ_WORDS.some(word => text.includes(word))
  if (isMatchBuzzWords) {
    await context.sendText('請試著打 ROOM_FULL 或 ROOM_AVA ？', {
      quickReplies: POSTBACKS.map((term) => {
        return {
          contentType: 'text',
          title: term.title,
          payload: term.payload
        }
      })
    })
  }
  if (ev.isText) {
    await context.sendText(`我看不懂「${text}」，請試著打 help 看看？`)
  }
}

module.exports = echoHandler
