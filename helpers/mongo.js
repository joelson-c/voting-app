const ObjectId = require('mongoose').Types.ObjectId

exports.checkMongoIdEql = (mongoId, str) => {
  if (ObjectId.isValid(mongoId)) {
    return (mongoId.toString() === str)
  } else {
    return false
  }
}
