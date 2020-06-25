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

module.exports = {
  printBoard,
  convertIdxToPosition,
  convertPositionToIdx
}
