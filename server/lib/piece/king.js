const { convertIdxToPosition, convertPositionToIdx } = require('../../util')
const { PIECES } = require('../../util/constant')
const logger = require('../../util/logger')('board:King')

function isMoveValid({ src, dest }) {
  return (
    src - 9 === dest ||
    src - 8 === dest ||
    src - 7 === dest ||
    src + 1 === dest ||
    src + 9 === dest ||
    src + 8 === dest ||
    src + 7 === dest ||
    src - 1 === dest
  )
}

function isCastleMove(src, dest, board = []) {
  const piece = board[src]
  logger.debug(piece)
  if (Math.abs(piece) !== PIECES.KING) {
    return false
  }
  if (piece > 0) {
    return dest === 6 || dest === 2
  } else {
    logger.debug('dest: ', dest)
    return dest === 58 || dest === 62
  }
}

//TODO: refactor check condition
function checkByRow({ pos, player = 1, board = [] }) {
  for (let i = pos.x; i < 8; i++) {
    const newPos = { ...pos, x: i }
    if (
      board[convertPositionToIdx(newPos)] === -1 * player * PIECES.ROOK ||
      board[convertPositionToIdx(newPos)] === -1 * player * PIECES.QUEEN
    ) {
      return true
    }
    if (board[convertPositionToIdx(newPos)] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.ROOK
    ) {
      break
    }
  }
  for (let i = pos.x; i >= 0; i--) {
    const newPos = { ...pos, x: i }
    if (
      board[convertPositionToIdx(newPos)] === -1 * player * PIECES.ROOK ||
      board[convertPositionToIdx(newPos)] === -1 * player * PIECES.QUEEN
    ) {
      return true
    }
    if (board[convertPositionToIdx(newPos)] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.ROOK
    ) {
      break
    }
  }

  return false
}

function checkByColumn({ idx, player = 1, board = [] }) {
  for (let i = idx + 8; i < 64; i += 8) {
    if (
      board[i] === -1 * player * PIECES.QUEEN ||
      board[i] === -1 * player * PIECES.ROOK
    ) {
      return true
    }
    if (board[i] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.ROOK
    ) {
      break
    }
  }
  for (let i = idx - 8; i >= 0; i -= 8) {
    if (
      board[i] === -1 * player * PIECES.QUEEN ||
      board[i] === -1 * player * PIECES.ROOK
    ) {
      return true
    }
    if (board[i] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.ROOK
    ) {
      break
    }
  }
  return false
}

function checkByDiagonal({ idx, player = 1, board = [] }) {
  for (let i = idx + 7; i < 64; i += 7) {
    if (
      board[i] === -1 * player * PIECES.QUEEN ||
      board[i] === -1 * player * PIECES.BISHOP
    ) {
      return true
    }
    if (board[i] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.BISHOP
    ) {
      break
    }
  }
  for (let i = idx + 9; i < 64; i += 9) {
    if (
      board[i] === -1 * player * PIECES.QUEEN ||
      board[i] === -1 * player * PIECES.BISHOP
    ) {
      return true
    }
    if (board[i] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.BISHOP
    ) {
      break
    }
  }
  for (let i = idx - 7; i >= 0; i -= 7) {
    if (
      board[i] === -1 * player * PIECES.QUEEN ||
      board[i] === -1 * player * PIECES.BISHOP
    ) {
      return true
    }
    if (board[i] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.BISHOP
    ) {
      break
    }
  }
  for (let i = idx - 9; i >= 0; i -= 9) {
    if (
      board[i] === -1 * player * PIECES.QUEEN ||
      board[i] === -1 * player * PIECES.BISHOP
    ) {
      return true
    }
    if (board[i] / player > 0) {
      break
    }
    if (
      Math.abs(board[i]) !== PIECES.QUEEN &&
      Math.abs(board[i]) !== PIECES.BISHOP
    ) {
      break
    }
  }

  return false
}

function checkByKnight({ idx, player = 1, board = [] }) {
  return (
    board[idx - 17] === -1 * player * PIECES.KNIGHT ||
    board[idx - 10] === -1 * player * PIECES.KNIGHT ||
    board[idx + 6] === -1 * player * PIECES.KNIGHT ||
    board[idx + 15] === -1 * player * PIECES.KNIGHT ||
    board[idx - 15] === -1 * player * PIECES.KNIGHT ||
    board[idx - 6] === -1 * player * PIECES.KNIGHT ||
    board[idx + 10] === -1 * player * PIECES.KNIGHT ||
    board[idx + 17] === -1 * player * PIECES.KNIGHT
  )
}

function checkByPawn({ idx, player = 1, board = [] }) {
  if (player > 0) {
    return (
      board[idx + 9] === -1 * PIECES.PAWN || board[idx + 7] === -1 * PIECES.PAWN
    )
  } else {
    board[idx - 9] === PIECES.PAWN || board[idx - 7] === PIECES.PAWN
  }
}

function isChecked({ idx, player = 1, board = [] }) {
  const pos = convertIdxToPosition(idx)

  return (
    checkByPawn({ idx, player, board }) ||
    checkByKnight({ idx, player, board }) ||
    checkByColumn({ idx, player, board }) ||
    checkByDiagonal({ idx, player, board }) ||
    checkByRow({ pos, player, board })
  )
}

module.exports = {
  isMoveValid,
  isChecked,
  isCastleMove
}
