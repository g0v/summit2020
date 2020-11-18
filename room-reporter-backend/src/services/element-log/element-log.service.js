const createModel = require('../../models/element-log.model')
const { ElementLog } = require('./element-log.class')
const hooks = require('./element-log.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/element-log', new ElementLog(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('element-log')

  service.hooks(hooks)
}
