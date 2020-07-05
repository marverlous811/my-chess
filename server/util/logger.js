const log = require('debug')
const debug = log('debug:')
const info = log('info:')
const warm = log('warm:')
const error = log('error:')

const logFilter = require('../config').LOGGER
log.enable(logFilter)

function logger(namespace = '') {
  const _debug = debug.extend(namespace)
  const _info = info.extend(namespace)
  const _warm = warm.extend(namespace)
  const _error = error.extend(namespace)

  _error.log = console.error.bind(console)
  _info.log = console.info.bind(console)
  _warm.log = console.warn.bind(console)
  _debug.log = console.debug.bind(console)

  return {
    debug: _debug,
    info: _info,
    warm: _warm,
    error: _error
  }
}

module.exports = logger
