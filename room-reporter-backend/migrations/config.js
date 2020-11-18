const { app } = require('../src/app')
const env = process.env.NODE_ENV || 'development'
const dialect = 'postgres'

const dialectOptions = {}

if (env === 'production') {
  dialectOptions.ssl = {
    // accept self-signed ssl XD
    // https://github.com/brianc/node-postgres/issues/2009#issuecomment-556020509
    require: true,
    rejectUnauthorized: false
  }
}

module.exports = {
  [env]: {
    dialect,
    url: app.get('db'),
    dialectOptions,
    migrationStorageTableName: '_migrations'
  }
}
