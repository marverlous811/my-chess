const defaultBestValue = 9999
const defaultAlpha = -10000
const defaultBeta = 10000

const evaluateBoard = require('./piece')
const logger = require('../util/logger')('bot:mini-max')

function minimax(
  depth,
  game,
  isMaximissingPlayer,
  alpha = defaultAlpha,
  beta = defaultBeta
) {
  if (depth === 0) {
    return isMaximissingPlayer
      ? -1 * evaluateBoard(game.board)
      : evaluateBoard(game.board)
  }

  const gameMoves = game.moves()

  if (isMaximissingPlayer) {
    let bestMoveValue = -1 * defaultBestValue
    for (let move of gameMoves) {
      game.move(move)
      bestMoveValue = Math.max(
        bestMoveValue,
        minimax(depth - 1, game, !isMaximissingPlayer)
      )
      game.undo()
      const _alpha = Math.max(alpha, bestMoveValue)
      if (beta <= _alpha) {
        return bestMoveValue
      }
    }
    return bestMoveValue
  } else {
    let bestMoveValue = defaultBestValue
    for (let move of gameMoves) {
      game.move(move)
      bestMoveValue = Math.min(
        bestMoveValue,
        minimax(depth - 1, game, !isMaximissingPlayer)
      )
      game.undo()
      const _beta = Math.min(beta, bestMoveValue)
      if (_beta < alpha) {
        return bestMoveValue
      }
    }
    return bestMoveValue
  }
}

function nextMove(depth, game, isMaximissingPlayer) {
  let bestMove = null
  let bestMoveValue = isMaximissingPlayer ? -defaultBestValue : defaultBestValue

  const moves = game.moves()
  //   logger.debug('list move: ', moves)
  for (let move of moves) {
    game.move(move)
    let predictValue = minimax(depth - 1, game, !isMaximissingPlayer)
    if (isMaximissingPlayer) {
      bestMoveValue =
        predictValue >= bestMoveValue ? predictValue : bestMoveValue
      bestMove = predictValue >= bestMoveValue ? move : bestMove
    } else {
      bestMoveValue =
        predictValue <= bestMoveValue ? predictValue : bestMoveValue
      bestMove = predictValue <= bestMoveValue ? move : bestMove
    }

    game.undo()
  }

  return bestMove
}

module.exports = nextMove
