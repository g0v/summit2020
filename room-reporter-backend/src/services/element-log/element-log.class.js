const dayjs = require('dayjs')
const { fn, col, Op } = require('sequelize')
const { Service } = require('feathers-sequelize')
const location = require('../../utils/location.json')

exports.ElementLog = class ElementLog extends Service {
  async find () {
    // ignore params at all XD
    const last2Hour = dayjs().subtract(2, 'hour')
    const perElementStatus = await this.Model.findAll({
      attributes: [
        'element',
        [fn('max', col('id')), 'id']
      ],
      where: {
        updatedAt: {
          [Op.gte]: last2Hour.toDate()
        }
      },
      group: ['element']
    })
    const ids = perElementStatus.map(ele => ele.id)
    const lastElementStatus = await this.Model.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })

    const locationMap = location.reduce((sum, room) => {
      return {
        ...sum,
        [room.id]: {
          zhName: room['場地-華語'],
          enName: room['場地-en']
        }
      }
    }, {})

    return lastElementStatus.map((element) => {
      const room = locationMap[element.element]
      const ret = {
        zhName: room.zhName,
        enName: room.enName,
        updatedAt: element.updatedAt,
        timeOutAt: element.timeOutAt,
        isFull: false
      }
      if (element.value.isFull) {
        const timeOutAt = dayjs(element.timeOutAt)
        ret.isFull = timeOutAt.isAfter(dayjs())
      }
      return ret
    })
  }
}
