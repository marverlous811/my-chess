function printBoard(board) {
  let string = ''
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      const idx = i * 8 + j
      if (j === 7) {
        string += ('0' + board[idx]).slice(-2) + '\n'
      } else {
        string += ('0' + board[idx]).slice(-2) + ' '
      }
    }

  console.log(string)
}

function convertIdxToPosition(idx = 0) {
  const x = idx % 8
  const y = (idx - x) / 8

  return { x, y }
}

function convertPositionToIdx({ x, y }) {
  return y * 8 + x
}

function surroundPosition({ x = 0, y = 0 }) {
  const retval = []
  if (x > 0) {
    retval.push(convertPositionToIdx({ x: x - 1, y }))
  }
  if (y < 7) {
    retval.push(convertPositionToIdx({ x, y: y + 1 }))
  }
  if (x < 7) {
    retval.push(convertPositionToIdx({ x: x + 1, y: y }))
  }
  if (y > 0) {
    retval.push(convertPositionToIdx({ x, y: y - 1 }))
  }
  if (x < 7 && y > 0) {
    retval.push(convertPositionToIdx({ x: x + 1, y: y - 1 }))
  }
  if (y > 0 && x > 0) {
    retval.push(convertPositionToIdx({ x: x - 1, y: y - 1 }))
  }
  if (x > 0 && y < 7) {
    retval.push(convertPositionToIdx({ x: x - 1, y: y + 1 }))
  }
  if (x < 7 && y < 7) {
    retval.push(convertPositionToIdx({ x: x + 1, y: y + 1 }))
  }

  return retval
}

module.exports = {
  printBoard,
  convertIdxToPosition,
  convertPositionToIdx,
  surroundPosition
}
