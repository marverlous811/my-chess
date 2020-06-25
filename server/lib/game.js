const { initBoard, move } = require('./board')
const Filter = require('./filter')
const { GAME_MODE } = require('../util/constant')

class Game {
  constructor() {
    this.board = []
    this.filters = []
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
    if (piece / this.turn < 0) return this.board

    let newDest = dest
    if (this.filters.length > 0) {
      for (let filter of this.filters) {
        newDest = filter({ src, dest, board: this.board })
      }
    }

    if (move(src, newDest, this.board)) {
      this.board[newDest] = piece
      this.board[src] = 0
      this.turn *= -1
    }

    return this.board
  }
}

module.exports = Game
