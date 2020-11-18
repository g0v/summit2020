const createModel = require('../../models/member.model')
const { Member } = require('./member.class')
const hooks = require('./member.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/member', new Member(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('member')

  service.hooks(hooks)
}
