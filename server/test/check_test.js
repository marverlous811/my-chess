const chai = require('chai')
const { PIECES } = require('../util/constant')
const Pieces = require('../lib/piece')

describe('test king checked', function() {
  describe('check by rook', function() {
    it('checked in row', function(done) {
      const board = Array(64).fill(0)
      board[30] = PIECES.KING
      board[25] = -PIECES.ROOK

      const isChecked = Pieces.King.isChecked({ idx: 30, player: 1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
    it('checked in colume', function(done) {
      const board = Array(64).fill(0)
      board[30] = PIECES.KING
      board[46] = -PIECES.ROOK

      const isChecked = Pieces.King.isChecked({ idx: 30, player: 1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
    it('not checked', function(done) {
      const board = Array(64).fill(0)
      board[30] = PIECES.KING
      board[47] = -PIECES.ROOK

      const isChecked = Pieces.King.isChecked({ idx: 30, player: 1, board })
      chai.expect(isChecked).to.equal(false)
      done()
    })
    it('black checked by white', function(done) {
      const board = Array(64).fill(0)
      board[30] = -PIECES.KING
      board[46] = PIECES.ROOK

      const isChecked = Pieces.King.isChecked({ idx: 30, player: -1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
  })
  describe('check by bishop', function() {
    it('checked in upper left', function(done) {
      const board = Array(64).fill(0)
      board[27] = PIECES.KING
      board[9] = -PIECES.BISHOP

      const isChecked = Pieces.King.isChecked({ idx: 27, player: 1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
    it('checked in upper right', function(done) {
      const board = Array(64).fill(0)
      board[27] = PIECES.KING
      board[13] = -PIECES.BISHOP

      const isChecked = Pieces.King.isChecked({ idx: 27, player: 1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
    it('checked in bottom right', function(done) {
      const board = Array(64).fill(0)
      board[27] = PIECES.KING
      board[45] = -PIECES.BISHOP

      const isChecked = Pieces.King.isChecked({ idx: 27, player: 1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
    it('checked in bottom left', function(done) {
      const board = Array(64).fill(0)
      board[27] = PIECES.KING
      board[41] = -PIECES.BISHOP

      const isChecked = Pieces.King.isChecked({ idx: 27, player: 1, board })
      chai.expect(isChecked).to.equal(true)
      done()
    })
  })
})
