// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const member = sequelizeClient.define('member', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    channelType: {
      type: DataTypes.STRING
    },
    channelId: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    profile: {
      type: DataTypes.JSONB
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    },
    indexes: [
      {
        unique: false,
        fields: ['channelType', 'channelId']
      }
    ]
  })

  // eslint-disable-next-line no-unused-vars
  member.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    member.hasMany(models.elementlog)
  }

  return member
}
