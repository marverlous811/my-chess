const { initBoard, move } = require('./board')
const { isEmptyRow } = require('./piece/util')
const Filter = require('./filter')
const { GAME_MODE, PIECES } = require('../util/constant')
const piece = require('./piece')
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

    if (this.isCastleMove(src, newDest)) {
      logger.info('using castle move...', src, newDest)
      const rookIdx = src < newDest ? src + 3 : src - 4
      logger.debug('rook ', rookIdx)
      if (!this.canCastle(src, newDest, rookIdx)) {
        logger.debug('cant not castle...')
        return false
      }

      const rook = this.board[rookIdx]
      this.board[src] = 0
      this.board[rookIdx] = 0
      this.board[newDest] = piece
      const rookDest = src < newDest ? newDest - 1 : newDest + 1
      logger.debug(rookDest)
      this.board[rookDest] = rook

      return true
    } else {
      if (!move(src, newDest, this.board)) {
        logger.error('move is not valid ', src, newDest)
        return false
      }

      this.board[newDest] = piece
      this.board[src] = 0
    }

    this.history.push({ piece, src, newDest })
    return true
  }

  isCastleMove(src, dest) {
    return piece.King.isCastleMove(src, dest, this.board)
  }

  canCastle(kingIdx, dest, rookIdx) {
    //between king and rook is not have any piece
    if (!isEmptyRow(kingIdx, rookIdx, this.board)) {
      logger.debug('row not empty..')
      return false
    }

    //now king postion and new king postion not check by any opp pieces
    if (
      piece.King.isChecked({
        idx: kingIdx,
        player: this.turn,
        board: this.board
      }) ||
      piece.King.isChecked({
        idx: dest,
        player: this.turn,
        board: this.board
      })
    ) {
      logger.debug('is Checked')
      return false
    }

    //king is not moving
    const kingMove = this.history.filter(move => {
      return move.piece === PIECES.KING * this.turn
    })
    logger.info('king move ', kingMove)
    if (kingMove > 0) return false

    //rook used to castle not moving
    const rookMove = this.history.filter(move => {
      return move.piece === PIECES.ROOK * this.turn && move.src === rookIdx
    })
    logger.info('rook move ', rookMove)
    if (rookMove > 0) return false

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
