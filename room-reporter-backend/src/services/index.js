const member = require('./member/member.service')
const elementLog = require('./element-log/element-log.service')


module.exports = function (app) {
  app.configure(member)
  app.configure(elementLog)
}
