const { NotAuthenticated } = require('@feathersjs/errors')

module.exports = function onlyInternal (context) {
  const { params: { provider } } = context
  if (provider === 'server') {
    return context
  }
  throw new NotAuthenticated()
}
