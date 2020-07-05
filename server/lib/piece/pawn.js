const logger = require('../../util/logger')('board:pawn')

const defaultPosition = {
  w: [8, 9, 10, 11, 12, 13, 14, 15],
  b: [48, 49, 50, 51, 52, 53, 54, 55]
}

function isEvolution(piece, idx) {
  if (piece > 0) {
    logger.debug(Math.floor(idx / 8))
    return Math.floor(idx / 8) === 7
  } else {
    return Math.floor(idx / 8) === 0
  }
}

function isMoveValid({ src, dest, player, isDestEnemyOccupied = false }) {
  // logger.info('player: ', player, src, dest)
  if (player > 0) {
    if (isDestEnemyOccupied) {
      return dest === src + 9 || dest === src + 7
    }

    // logger.debug('move forward 1 ', dest === src + 8)
    return (
      dest === src + 8 ||
      (dest === src + 16 && defaultPosition.w.indexOf(src) !== -1)
    )
  }

  if (isDestEnemyOccupied) return dest === src - 9 || dest === src - 7

  return (
    dest === src - 8 ||
    (dest === src - 16 && defaultPosition.b.indexOf(src) !== -1)
  )
}

module.exports = {
  isMoveValid,
  isEvolution
}
