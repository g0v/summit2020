class Global {
  constructor () {
    this.cache = {}
  }

  setItem (name, value) {
    this.cache[name] = value
  }

  getItem (name, defaultValue = undefined) {
    if (name in this.cache) {
      return this.cache[name]
    }
    return defaultValue
  }
}

module.exports = new Global()
