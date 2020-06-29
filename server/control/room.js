const Game = require('../lib/game')
const { GAME_MODE, PLAYER_STATE } = require('../util/constant')
const logger = require('../util/logger')('room')
const { printBoard } = require('../util')

class Room {
  constructor(name) {
    logger.info('create room ', name)
    this.name = name
    this.listUser = []
    this.userState = []
    this.game = new Game()
    this.game.setMode(GAME_MODE.FOG_MODE)
  }

  boardcast(msg) {
    for (let player of this.listUser) {
      player.onRoomUpdate(msg)
    }
  }

  onUserJoinRoom(player) {
    if (this.listUser >= 2) return -1
    logger.info('have a player join room...')
    this.listUser.push(player)
    this.userState.push(PLAYER_STATE.JOINED)

    return this.listUser.length - 1
  }

  playerReady(idx) {
    if (idx >= this.listUser.length) {
      logger.error('player not in list')
      return false
    }
    if (this.userState[idx] === PLAYER_STATE.READY) {
      logger.error('player already ready')
      return false
    }

    logger.info(`room ${this.name} player ${idx + 1} ready`)
    this.userState[idx] = PLAYER_STATE.READY

    if (this.isAllReady()) {
      logger.info(`2 player is ready, game will start soon...`)
      setTimeout(() => {
        this.initGame()
      }, 2000)
    }

    return true
  }

  playerLeave(idx) {
    if (idx >= this.listUser.length) {
      logger.error('player not in list')
      return false
    }

    logger.info(`room ${this.name} player ${idx + 1} ready`)
    this.userState[idx] = PLAYER_STATE.LEAVED
  }

  isAllReady() {
    let retval = true
    if (this.userState.length < 2) return false
    for (let state of this.userState) {
      retval = retval && state === PLAYER_STATE.READY
    }

    return retval
  }

  isAllLeaved() {
    let retval = true
    if (this.userState.length < 2) return false
    for (let state of this.userState) {
      retval = retval && state === PLAYER_STATE.LEAVED
    }

    return retval
  }

  initGame() {
    const selectSide = Math.floor(Math.random())
    this.listUser[0].init(selectSide === 0 ? 1 : -1, this.game)
    this.listUser[1].init(selectSide === 0 ? -1 : 1, this.game)
    this.game.init()
  }

  move(src, dest) {
    const valid = this.game.move(src, dest)
    logger.debug('move is valid: ', valid)
    if (!valid) {
      return
    }

    // console.log(this.game.board.join(':'))
    printBoard(this.game.board)
    this.boardcast(`updateBoard:${this.game.board.join(':')}`)

    if (this.game.isWinner()) {
      return this.boardcast(`winner:${this.game.turn}`)
    }

    this.game.changeTurn()
    this.boardcast(`changeTurn:${this.game.turn}`)
  }
}

module.exports = Room
