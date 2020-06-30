function isEmptyRow(src, dest, board = []) {
  const start = src < dest ? src : dest
  const end = src < dest ? dest : src

  return checkEmpty(start, end, 1, board)
}

function isEmptyColumn(src, dest, board = []) {
  const start = src < dest ? src : dest
  const end = src < dest ? dest : src

  return checkEmpty(start, end, 8, board)
}

function isEmptyDiagonal(src, dest, board = []) {
  const start = src < dest ? src : dest
  const end = src < dest ? dest : src

  if (Math.abs(src - dest) % 9 === 0) {
    return checkEmpty(start, end, 9, board)
  }

  return checkEmpty(start, end, 7, board)
}

function checkEmpty(start, end, step, board = []) {
  for (let i = start + step; i < end; i += step) {
    if (board[i] !== 0) return false
  }

  return true
}

module.exports = {
  isEmptyRow,
  isEmptyColumn,
  isEmptyDiagonal
}
