const Room = require('./room')
const logger = require('../util/logger')('manager')

class Manager {
  constructor() {
    // this.listUsers = {}
    this.listRoom = {}
  }

  userJoinRoom(name, player) {
    if (!this.listRoom.hasOwnProperty(name)) {
      const room = new Room(name)
      this.listRoom[name] = room
    }

    const room = this.listRoom[name]
    const retval = room.onUserJoinRoom(player)
    if (retval === -1) {
      return -1
    }

    player.setRoom(room)
    return retval
  }

  userLeaveRoom(roomName) {
    if (!this.listRoom.hasOwnProperty(roomName)) {
      return
    }

    const room = this.listRoom[roomName]
    if (room.isAllLeaved()) {
      logger.info('all user in room leaved, will remove room...')
      delete this.listRoom[roomName]
    }
  }
}

module.exports = Manager
