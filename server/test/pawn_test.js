const chai = require('chai')
const { PIECES } = require('../util/constant')
const Game = require('../lib/game')

const game = new Game()

describe('test moving of pawn', function() {
  describe('move from start position', function() {
    it('move forward 2 step', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[8] = PIECES.PAWN
      result[24] = PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(8, 24, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
    it('move forward 1 step', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[8] = PIECES.PAWN
      result[16] = PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(8, 16, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
    it('black play', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[48] = -PIECES.PAWN
      result[32] = -PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(48, 32, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
  })
  describe('move from some position', function() {
    it('move forward 1 step', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[16] = PIECES.PAWN
      result[24] = PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(16, 24, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
    it('move forward 2 step', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[16] = PIECES.PAWN
      result[16] = PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(16, 32, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
  })
  describe('kill enemy', function() {
    it('enemy ahead', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[16] = PIECES.PAWN
      board[24] = -PIECES.PAWN
      result[16] = PIECES.PAWN
      result[24] = -PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(16, 24, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
    it('kill enemy', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[16] = PIECES.PAWN
      board[25] = -PIECES.PAWN
      result[25] = PIECES.PAWN

      game.setBoard(board)
      let newBoard = game.move(16, 25, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
    it('friend in can kill position', function(done) {
      const board = Array(64).fill(0)
      const result = Array(64).fill(0)
      board[16] = PIECES.PAWN
      board[25] = PIECES.QUEEN
      result[16] = PIECES.PAWN
      result[25] = PIECES.QUEEN

      game.setBoard(board)

      let newBoard = game.move(16, 25, board)
      chai.expect(newBoard).to.eql(result)
      done()
    })
  })
})
