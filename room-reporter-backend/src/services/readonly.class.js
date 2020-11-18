const { Service } = require('feathers-sequelize')
const { NotImplemented } = require('@feathersjs/errors')

exports.ReadonlyService = class ReadonlyService extends Service {
  create () {
    throw new NotImplemented()
  }

  update () {
    throw new NotImplemented()
  }

  patch () {
    throw new NotImplemented()
  }

  remove () {
    throw new NotImplemented()
  }
}
