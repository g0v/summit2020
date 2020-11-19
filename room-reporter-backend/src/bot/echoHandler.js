async function echoHandler (context, { next }) {
  const ev = context.event
  if (ev.isDelivery) {
    return next
  }
  if (ev.isText) {
    console.log(context, context.user, context.session)
    await context.sendText(`我看到你說：「${ev.text}」囉～`)
  }
}

module.exports = echoHandler
