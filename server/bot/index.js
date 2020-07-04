const Simulate = require('./simulate')
const minimax = require('./minimax')
const { BOT_ALG_TYPE } = require('../util/constant')

class Bot {
  constructor(alg, deep = 3, side = -1) {
    this.alg = alg
    this.deep = deep
    this.side = side
    this.simulate = new Simulate(this.side)
  }

  onMove(board = []) {
    this.simulate.updateBoard(board)
    return this.calcNextMove()
  }

  calcNextMove() {
    switch (this.alg) {
      case BOT_ALG_TYPE.MINMAX:
        return minimax(this.deep, this.simulate, this.side === -1)
    }
  }
}

module.exports = Bot
