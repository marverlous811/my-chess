function isMoveValid({ src, dest }) {
  return (
    src - 17 === dest ||
    src - 10 === dest ||
    src + 6 === dest ||
    src + 15 === dest ||
    src - 15 === dest ||
    src - 6 === dest ||
    src + 10 === dest ||
    src + 17 === dest
  )
}

module.exports = {
  isMoveValid
}
