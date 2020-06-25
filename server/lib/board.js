const { PIECES } = require('../util/constant')
const pieces = require('./piece')

function initBoard() {
  const board = Array(64).fill(0)
  for (let i = 8; i < 16; i++) {
    board[i] = PIECES.PAWN
    board[i + 40] = -PIECES.PAWN
  }

  board[0] = PIECES.ROOK
  board[7] = PIECES.ROOK
  board[56] = -PIECES.ROOK
  board[63] = -PIECES.ROOK

  board[1] = PIECES.KNIGHT
  board[6] = PIECES.KNIGHT
  board[57] = -PIECES.KNIGHT
  board[62] = -PIECES.KNIGHT

  board[2] = PIECES.BISHOP
  board[5] = PIECES.BISHOP
  board[58] = -PIECES.BISHOP
  board[61] = -PIECES.BISHOP

  board[3] = PIECES.QUEEN
  board[4] = PIECES.KING

  board[59] = -PIECES.QUEEN
  board[60] = -PIECES.KING

  return board
}

function validMove(piece, src, dest, isDestEnemyOccupied = false) {
  const type = Math.abs(piece)
  if (src === dest) return false
  switch (type) {
    case PIECES.PAWN:
      return pieces.Pawn.isMoveValid({
        src,
        dest,
        player: piece,
        isDestEnemyOccupied
      })
    case PIECES.KNIGHT:
      return pieces.Knight.isMoveValid({
        src,
        dest
      })
    case PIECES.BISHOP:
      return pieces.Bishop.isMoveValid({
        src,
        dest
      })
    case PIECES.ROOK:
      return pieces.Rook.isMoveValid({
        src,
        dest
      })
    case PIECES.QUEEN:
      return pieces.Queen.isMoveValid({
        src,
        dest
      })
    case PIECES.KING:
      return pieces.King.isMoveValid({
        src,
        dest
      })
    default:
      break
  }

  return false
}

function move(src, dest, board = []) {
  if (board.length !== 64) return false
  if (board[src] === 0) return false
  if (board[dest] !== 0 && board[src] / board[dest] > 0) return false

  const piece = board[src]
  const isDestEnemyOccupied = board[dest] !== 0 && board[dest] / board[src] < 0
  if (!validMove(piece, src, dest, isDestEnemyOccupied)) {
    return false
  }

  return true
}

module.exports = {
  initBoard,
  move
}
