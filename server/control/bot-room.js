const Game = require('../lib/game')
const {
  GAME_MODE,
  PLAYER_STATE,
  BOT_ALG_TYPE,
  PIECES
} = require('../util/constant')
const logger = require('../util/logger')('bot-room')
const Bot = require('../bot')
const { printBoard } = require('../util')

class Room {
  constructor(name) {
    logger.info('create room ', name)
    this.name = name
    this.user = null
    this.game = new Game()
    this.bot = new Bot(BOT_ALG_TYPE.MINMAX)
    this.game.setMode(GAME_MODE.FOG_MODE)
  }

  boardcast(msg) {
    if (this.user) this.user.onRoomUpdate(msg)
  }

  onUserJoinRoom(player) {
    if (this.user) return -1
    this.user = player
    this.userState = PLAYER_STATE.JOINED
    return 0
  }

  playerReady() {
    if (!this.user) return false
    if (this.userState === PLAYER_STATE.READY) return false

    this.userState = PLAYER_STATE.READY
    setTimeout(() => {
      this.initGame()
    }, 2000)
    return true
  }

  initGame() {
    logger.debug('init game')
    this.game.init()
    this.user.init(1, this.game)
    this.bot.init(this, -1)
  }

  move(src, dest) {
    const valid = this.game.move(src, dest)
    logger.debug('move is valid: ', valid)
    if (!valid) {
      return
    }
    this.boardcast(`updateBoard:${this.game.board.join(':')}`)

    if (this.game.isWinner()) {
      return this.boardcast(`winner:${this.game.turn}`)
    }

    if (this.game.isEvolution()) {
      if (this.user) return this.user.onRoomUpdate(`evol:${dest}`)
    }

    return this.moveComplete()
  }

  moveComplete() {
    this.game.changeTurn()
    this.boardcast(`changeTurn:${this.game.turn}`)

    this.bot.onMove([...this.game.board])
  }

  onBotMoveComplete() {
    this.game.changeTurn()
    printBoard(this.game.board)
    this.boardcast(`changeTurn:${this.game.turn}`)
  }

  botMove({ src, dest }) {
    const valid = this.game.move(src, dest)
    if (!valid) {
      return
    }
    this.boardcast(`updateBoard:${this.game.board.join(':')}`)
    if (this.game.isWinner()) {
      return this.boardcast(`winner:${this.game.turn}`)
    }
    if (this.game.isEvolution()) {
      this.game.evolution(PIECES.QUEEN, dest)
    }

    return this.onBotMoveComplete()
  }

  onEvol(piece, idx) {
    logger.info('evolution...', piece, idx)
    this.game.evolution(piece, idx)
    this.boardcast(`updateBoard:${this.game.board.join(':')}`)

    return this.moveComplete()
  }

  isAllLeaved() {
    return this.userState === PLAYER_STATE.READY
  }

  playerLeave() {
    if (!this.user) return
    this.userState = PLAYER_STATE.LEAVED
  }
}

module.exports = Room
