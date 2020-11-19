const onlyInternal = require('../../middleware/onlyInternal')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [onlyInternal],
    update: [onlyInternal],
    patch: [onlyInternal],
    remove: [onlyInternal]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
