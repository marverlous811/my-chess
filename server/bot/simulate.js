const { move } = require('../lib/board')
const { genAllMove } = require('./move')
const logger = require('../util/logger')('bot:simulate')

class SimulateGame {
  constructor(side = -1, board = []) {
    this.side = side
    this.board = board
    this.turn = this.side
    this.oldState = []
  }

  updateBoard(board = []) {
    this.board = board
    this.turn = this.side
    this.oldState = []
  }

  move({ src, dest }) {
    const valid = move(src, dest, this.board)
    if (!valid) {
      //   logger.debug('invalid move: ', src, dest)
      return
    }

    this.oldState.push([...this.board])
    const piece = this.board[src]
    this.board[src] = 0
    this.board[dest] = piece

    this.turn *= -1
  }

  moves() {
    return genAllMove(this.turn, this.board)
  }

  undo() {
    if (this.oldState.length <= 0) return
    const board = this.oldState.pop()
    this.board = board
    this.turn *= -1
    // logger.debug('board length ', this.board)
  }
}

module.exports = SimulateGame
