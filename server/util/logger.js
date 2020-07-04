const debug = require('debug')('debug:')
const info = require('debug')('info:')
const warm = require('debug')('warm:')
const error = require('debug')('error:')

const logFilter = require('../config').LOGGER
const disableFilter = require('../config').LOGGER_DISABLE
require('debug').enable(logFilter)
require('debug').disable(disableFilter)

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
