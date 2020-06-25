function isMoveValid({ src, dest }) {
  return (
    src - 9 === dest ||
    src - 8 === dest ||
    src - 7 === dest ||
    src + 1 === dest ||
    src + 9 === dest ||
    src + 8 === dest ||
    src + 7 === dest ||
    src - 1 === dest
  )
}

module.exports = {
  isMoveValid
}
