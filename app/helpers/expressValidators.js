const isPlainObject = require('lodash.isplainobject')
const isEmpty = require('lodash.isempty')

module.exports = {
  isArray (value) {
    return Array.isArray(value)
  },

  hasLeastOneObject (array) {
    if (isEmpty(array) && this.isArray(array)) {
      return false
    } else if (this.isArray(array)) {
      return array.find((elem) => isPlainObject(elem) === false) === undefined
    } else {
      return false
    }
  }
}
