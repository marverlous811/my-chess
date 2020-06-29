const { initBoard, move } = require('./board')
const Filter = require('./filter')
const { GAME_MODE, PIECES } = require('../util/constant')
const logger = require('../util/logger')('game')

class Game {
  constructor() {
    this.board = []
    this.filters = []
    this.history = []
  }

  init() {
    this.board = initBoard()
    this.turn = 1
  }

  addFilter(filter) {
    this.filters.push(filter)
  }

  setMode(mode) {
    this.mode = mode
    switch (mode) {
      case GAME_MODE.FOG_MODE:
        this.addFilter(Filter.FogFilter)
        break
      default:
        break
    }
  }

  setBoard(board = []) {
    this.board = board
  }

  move(src, dest) {
    const piece = this.board[src]
    if (piece / this.turn < 0) {
      logger.warm('not this turn ', piece, this.turn, dest)
      return false
    }

    let newDest = dest
    if (this.filters.length > 0) {
      for (let filter of this.filters) {
        newDest = filter({ src, dest, board: this.board })
      }
    }

    if (!move(src, newDest, this.board)) {
      logger.error('move is not valid ', src, newDest)
      return false
    }

    this.history.push({ piece, src, newDest })

    this.board[newDest] = piece
    this.board[src] = 0

    return true
  }

  isWinner() {
    return !this.board.includes(-1 * this.turn * PIECES.KING)
  }

  changeTurn() {
    this.turn *= -1
  }
}

module.exports = Game
