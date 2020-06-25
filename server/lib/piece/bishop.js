function isMoveValid({ src, dest }) {
  return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0
}

module.exports = {
  isMoveValid
}
