module.exports = {
  LOGGER: process.env.LOGGER || '*',
  LOGGER_DISABLE: process.env.LOGGER_DISABLE || 'board:*,bot:*',
  PORT: process.env.PORT || 31798
}
