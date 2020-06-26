import { observable, action } from "mobx";
import { PIECES } from "../utils/constant";

export default class GameStore {
    @observable board: Array<number> = []

    @action initBoard() {
        this.board = Array(64).fill(0)
        for (let i = 8; i < 16; i++) {
            this.board[i] = PIECES.PAWN
            this.board[i + 40] = -PIECES.PAWN
        }

        this.board[0] = PIECES.ROOK
        this.board[7] = PIECES.ROOK
        this.board[56] = -PIECES.ROOK
        this.board[63] = -PIECES.ROOK

        this.board[1] = PIECES.KNIGHT
        this.board[6] = PIECES.KNIGHT
        this.board[57] = -PIECES.KNIGHT
        this.board[62] = -PIECES.KNIGHT

        this.board[2] = PIECES.BISHOP
        this.board[5] = PIECES.BISHOP
        this.board[58] = -PIECES.BISHOP
        this.board[61] = -PIECES.BISHOP

        this.board[3] = PIECES.QUEEN
        this.board[4] = PIECES.KING

        this.board[59] = -PIECES.QUEEN
        this.board[60] = -PIECES.KING
    }
}