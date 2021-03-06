const { chain } = require('bottender')

const onboardHandler = require('./onboardHandler')
const echoHandler = require('./echoHandler')
const menuHandler = require('./menuHandler')

// async function defaultHandler (context, { next }) {
//   const ev = context.event
//   console.log('[*] ', ev._rawEvent)
// }

module.exports = function App () {
  return chain([
    onboardHandler,
    menuHandler,
    echoHandler
  ])
}
