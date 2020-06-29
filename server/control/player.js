const logger = require('../util/logger')('player')

class Player {
  constructor(ws, manager) {
    this.ws = ws
    this.manager = manager
    this.ws.on('message', data => {
      if (data === 'ping') {
        return this.sendMsg('pong')
      }
      this.handleMsg(data)
    })
    this.ws.on('close', () => {
      this.onClose()
    })
  }

  setRoom(room) {
    logger.debug('add room ')
    this.room = room
  }

  init(site, game) {
    this.site = site
    this.game = game

    this.sendMsg(`init:${this.site}`)
  }

  join(name) {
    const retval = this.manager.userJoinRoom(name, this)
    logger.debug('joinRoom slot ', retval)
    if (retval === -1) {
      return this.sendMsg('join:error')
    }

    this.idx = retval
    this.sendMsg('join:success')
  }

  ready() {
    if (!this.room || isNaN(this.idx) || this.idx === -1) {
      return this.sendMsg('ready:error')
    }

    const state = this.room.playerReady(this.idx)
    if (!state) return this.sendMsg('ready:error')
    return this.sendMsg('ready:success')
  }

  move(src, dest) {
    if (!this.room) return
    return this.room.move(src, dest)
  }

  onRoomUpdate(msg) {
    return this.sendMsg(msg)
  }

  handleMsg(data) {
    const args = data.split(':')
    const cmd = args.shift()
    logger.debug(`cmd: ${cmd}, args: ${args}`)
    switch (cmd) {
      case 'join':
        return this.join(args[0])
      case 'ready':
        return this.ready()
      case 'move':
        return this.move(parseInt(args[0]), parseInt(args[1]))
      default:
        return
    }
  }

  onClose() {}

  sendMsg(msg) {
    this.ws.send(msg)
  }
}

module.exports = Player
