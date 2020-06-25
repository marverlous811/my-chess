const logger = require('../../util/logger')('pawn')

const defaultPosition = {
  w: [8, 9, 10, 11, 12, 13, 14, 15],
  b: [48, 49, 50, 51, 52, 53, 54, 55]
}

function isMoveValid({ src, dest, player, isDestEnemyOccupied = false }) {
  logger.info('player: ', player, src, dest)
  if (player > 0) {
    if (isDestEnemyOccupied) {
      return dest === src + 9 || dest === src + 7
    }

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
  isMoveValid
}
