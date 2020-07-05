const Simulate = require('./simulate')
const minimax = require('./minimax')
const { BOT_ALG_TYPE } = require('../util/constant')
const logger = require('../util/logger')('bot')

class Bot {
  constructor(alg, deep = 3) {
    this.alg = alg
    this.deep = deep
  }

  init(room, side = -1) {
    logger.info('bot side: ', side)
    this.side = side
    this.room = room
    this.simulate = new Simulate(this.side)
  }

  onMove(board = []) {
    this.simulate.updateBoard(board)
    const move = this.calcNextMove()
    logger.info('bot will move... ', move)
    return this.room.botMove(move)
  }

  calcNextMove() {
    switch (this.alg) {
      case BOT_ALG_TYPE.MINMAX:
        return minimax(this.deep, this.simulate, this.side === -1)
    }
  }
}

module.exports = Bot
