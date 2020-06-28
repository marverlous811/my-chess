const wsServer = require('ws').Server
const http = require('http')
const readline = require('readline')

const { PORT } = require('./config')
const Manager = require('./control/manager')
const Player = require('./control/player')
const logger = require('./util/logger')('server')
const server = http.createServer().listen(PORT, () => {
  logger.info(`server is listen at port ${PORT}...`)
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

rl.on('line', async line => {
  const args = line.split(' ')
  const cmd = args.shift()
  switch (cmd) {
    case '.exit':
      return process.exit(1)
    default:
      break
  }
})

const manager = new Manager()

const wsS = new wsServer({
  server
})
wsS.on('connection', ws => {
  logger.debug('have user connected')
  const player = new Player(ws, manager)
})
