const Game = require('../lib/game')
const { GAME_MODE } = require('../util/constant')
const Room = require('./room')

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
}

module.exports = Manager
