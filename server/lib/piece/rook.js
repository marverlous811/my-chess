function isMoveValid({ src, dest }) {
  const mod = src % 8
  const diff = 8 - mod
  return (
    Math.abs(src - dest) % 8 === 0 || (dest >= src - mod && dest < src + diff)
  )
}

module.exports = {
  isMoveValid
}
