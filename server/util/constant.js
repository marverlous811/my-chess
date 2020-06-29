const PIECES = {
  KING: 9,
  QUEEN: 5,
  ROOK: 4,
  BISHOP: 3,
  KNIGHT: 2,
  PAWN: 1
}

const GAME_MODE = {
  NORMAL: 0,
  FOG_MODE: 1
}

const PLAYER_STATE = {
  JOINED: 1,
  READY: 2,
  PLAYING: 3,
  LEAVED: 4,
  ERROR: -1
}

module.exports = {
  PIECES,
  GAME_MODE,
  PLAYER_STATE
}
