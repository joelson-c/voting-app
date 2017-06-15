const path = require('path')

global.currentRootDir = path.join(__dirname, '..')

global.rootRequire = function (name) {
  return require(path.join(__dirname, '..', name))
}
