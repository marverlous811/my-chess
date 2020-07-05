const { convertIdxToPosition, convertPositionToIdx } = require('../util')
const { move } = require('../lib/board')
const { PIECES } = require('../util/constant')
const maxStep = 7

const defaultPosition = {
  w: [8, 9, 10, 11, 12, 13, 14, 15],
  b: [48, 49, 50, 51, 52, 53, 54, 55]
}

function moveByRow(src, step) {
  const pos = convertIdxToPosition(src)
  if (pos.x + step < 0 || pos.x + step > 7) {
    return -1
  }

  return convertPositionToIdx({ x: pos.x + step, y: pos.y })
}

function moveByColumns(src, step) {
  const pos = convertIdxToPosition(src)
  if (pos.y + step < 0 || pos.y + step > 7) {
    return -1
  }

  return convertPositionToIdx({ x: pos.x, y: pos.y + step })
}

function moveByDiagonal(src, stepX, stepY) {
  const pos = convertIdxToPosition(src)
  if (
    pos.y + stepY < 0 ||
    pos.y + stepY > 7 ||
    pos.x + stepX < 0 ||
    pos.x + stepX > 7
  ) {
    return -1
  }

  return convertPositionToIdx({ x: pos.x + stepX, y: pos.y + stepY })
}

function genKingMove(piece, src, board = []) {
  const moves = [
    moveByDiagonal(src, -1, -1),
    moveByColumns(src, -1),
    moveByDiagonal(src, 1, -1),
    moveByRow(src, -1),
    moveByRow(src, 1),
    moveByDiagonal(src, -1, 1),
    moveByColumns(src, 1),
    moveByDiagonal(src, 1, 1)
  ]

  return moves.filter(des => src >= 0 && src < 64 && board[des] / piece <= 0)
}

function genKnightMove(piece, src, board = []) {
  const moves = [
    moveByDiagonal(src, -1, 2),
    moveByDiagonal(src, 1, 2),
    moveByDiagonal(src, 1, -2),
    moveByDiagonal(src, -1, -2),
    moveByDiagonal(src, 2, 1),
    moveByDiagonal(src, 2, -1),
    moveByDiagonal(src, -2, 1),
    moveByDiagonal(src, -2, -1)
  ]
  return moves.filter(des => src >= 0 && src < 64 && board[des] / piece <= 0)
}

function genBishopMove(piece, src, board = []) {
  const moves = []
  for (let i = 1; i < maxStep; i++) {
    const dest = moveByDiagonal(src, i, i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  for (let i = 1; i < maxStep; i++) {
    const dest = moveByDiagonal(src, i, -i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  for (let i = 1; i < maxStep; i++) {
    const dest = moveByDiagonal(src, -i, i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  for (let i = 1; i < maxStep; i++) {
    const dest = moveByDiagonal(src, -i, -i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  return moves
}

function genRookMove(piece, src, board = []) {
  const moves = []
  for (let i = 1; i < maxStep; i++) {
    const dest = moveByColumns(src, i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  for (let i = 1; i < maxStep; i++) {
    const dest = moveByColumns(src, -i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  for (let i = 1; i < maxStep; i++) {
    const dest = moveByRow(src, i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  for (let i = 1; i < maxStep; i++) {
    const dest = moveByRow(src, -i)
    if (dest === -1) {
      break
    }
    if (dest < 0 || dest >= 64 || board[dest] / piece > 0) {
      break
    }
    moves.push(dest)
  }

  return moves
}

function genQueenMove(piece, src, board = []) {
  return [
    ...genBishopMove(piece, src, board),
    ...genRookMove(piece, src, board)
  ]
}

function genPawnMove(piece, src, board = []) {
  const moves = []
  if (piece > 0) {
    if (defaultPosition.w.includes(src)) {
      moves.push(src + 16)
    }
    if (board[src + 7] / piece < 0) {
      moves.push(src + 7)
    }
    if (board[src + 9] / piece < 0) {
      moves.push(src + 9)
    }
    if (board[src + 8] === 0) {
      moves.push(src + 8)
    }
  } else {
    if (defaultPosition.b.includes(src)) {
      moves.push(src - 16)
    }
    if (board[src - 7] / piece < 0) {
      moves.push(src - 7)
    }
    if (board[src - 9] / piece < 0) {
      moves.push(src - 9)
    }
    if (board[src - 8] === 0) {
      moves.push(src - 8)
    }
  }

  return moves
}

function genPieceMove(piece, src, board = []) {
  const type = Math.abs(piece)
  switch (type) {
    case PIECES.KING:
      return genKingMove(piece, src, board)
    case PIECES.QUEEN:
      return genQueenMove(piece, src, board)
    case PIECES.ROOK:
      return genRookMove(piece, src, board)
    case PIECES.BISHOP:
      return genBishopMove(piece, src, board)
    case PIECES.KNIGHT:
      return genKnightMove(piece, src, board)
    case PIECES.PAWN:
      return genPawnMove(piece, src, board)
    default:
      return []
  }
}

function genAllMove(turn = 1, board = []) {
  const moves = []
  for (let i = 0; i < board.length; i++) {
    if (board[i] / turn > 0) {
      const dest = genPieceMove(board[i], i, board)
      if (dest.length <= 0) continue
      const pieceMove = dest.map(_dest => {
        return { src: i, dest: _dest }
      })
      moves.push(...pieceMove)
    }
  }

  return moves
}

module.exports = {
  genKingMove,
  genKnightMove,
  genBishopMove,
  genQueenMove,
  genRookMove,
  genPawnMove,
  genPieceMove,
  genAllMove
}
