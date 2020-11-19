// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const elementLog = sequelizeClient.define('elementlog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    element: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.JSONB
    },
    timeOutAt: {
      type: DataTypes.DATE
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  // eslint-disable-next-line no-unused-vars
  elementLog.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    elementLog.belongsTo(models.member)
  }

  return elementLog
}
