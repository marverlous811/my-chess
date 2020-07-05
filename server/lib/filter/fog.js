const { convertIdxToPosition, convertPositionToIdx } = require('../../util')
const { PIECES } = require('../../util/constant')

function queenFilter({ src, dest, board = [] }) {
  if (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0) {
    return bishopFilter({ src, dest, board })
  }

  return rookFilter({ src, dest, board })
}
function bishopFilter({ src, dest, board = [] }) {
  const startPos = convertIdxToPosition(src)
  const endPos = convertIdxToPosition(dest)

  const rowDirector = startPos.x > endPos.x ? -1 : 1
  const columnDirector = startPos.y > endPos.y ? -1 : 1

  let lastPosValid = { x: startPos.x, y: startPos.y }
  let tmpX = startPos.x + rowDirector,
    tmpY = startPos.y + columnDirector
  while (true) {
    const idx = convertPositionToIdx({ x: tmpX, y: tmpY })
    if (board[idx] !== 0) {
      break
    }

    lastPosValid.x = tmpX
    lastPosValid.y = tmpY

    if (tmpX == endPos.x && tmpY == endPos.y) {
      break
    }

    tmpX += rowDirector
    tmpY += columnDirector
  }

  return convertPositionToIdx(lastPosValid)
}
function rookFilter({ src, dest, board = [] }) {
  const startPos = convertIdxToPosition(src)
  const endPos = convertIdxToPosition(dest)

  const rowDirector =
    startPos.x !== endPos.x ? (startPos.x > endPos.x ? -1 : 1) : 0
  const columnDirector =
    startPos.y !== endPos.y ? (startPos.y > endPos.y ? -1 : 1) : 0

  let lastPosValid = { x: startPos.x, y: startPos.y }
  let tmpX = startPos.x + rowDirector,
    tmpY = startPos.y + columnDirector
  while (true) {
    const idx = convertPositionToIdx({ x: tmpX, y: tmpY })
    if (board[idx] !== 0) {
      break
    }

    lastPosValid.x = tmpX
    lastPosValid.y = tmpY

    if (tmpX == endPos.x && tmpY == endPos.y) {
      break
    }

    tmpX += rowDirector
    tmpY += columnDirector
  }

  return convertPositionToIdx(lastPosValid)
}

function filter({ src, dest, board = [] }) {
  const piece = Math.abs(board[src])
  switch (piece) {
    case PIECES.BISHOP:
      return bishopFilter({ src, dest, board })
    case PIECES.ROOK:
      return rookFilter({ src, dest, board })
    case PIECES.QUEEN:
      return queenFilter({ src, dest, board })
    default:
      return dest
  }
}

module.exports = filter
