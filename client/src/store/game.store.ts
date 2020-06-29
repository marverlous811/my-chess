import { observable, action } from "mobx";
import { PIECES, SELECT_STATE, PLAYER_STATE } from "../utils/constant";
import { surroundPosition, convertIdxToPosition } from "../utils";
import { sdk, ISdkObservable } from "../sdk/game.sdk";

export default class GameStore implements ISdkObservable {
    @observable board: Array<number> = []
    @observable player: number = 1
    @observable turn: number = 1
    @observable src = -1
    @observable dest = -1
    @observable state = PLAYER_STATE.IDLE
    @observable winner = 0
    constructor() {
        sdk.connectRoom()
        sdk.addListener(this)
    }

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

    isShowing(idx: number) {
        if (this.board[idx] / this.player > 0) return true
        const surround = surroundPosition(convertIdxToPosition(idx))
        for (let pos of surround) {
            if (this.board[pos] / this.player > 0) {
                return true
            }
        }
        return false
    }

    @action updateMove(idx: number): number {
        if (this.state !== PLAYER_STATE.PLAYING) return SELECT_STATE.ERROR
        if (this.src === -1) {
            return this.updateSrcMove(idx)
        }
        else if (this.dest === -1) {
            return this.updateDestMove(idx)
        }
    }

    @action updateSrcMove(idx: number): number {
        console.log(this.turn, this.player)
        if (this.turn !== this.player) return SELECT_STATE.ERROR
        if (this.board[idx] === 0) return SELECT_STATE.ERROR
        if (this.board[idx] / this.player < 0) return SELECT_STATE.ERROR

        this.src = idx

        return SELECT_STATE.SRC_SELECTED
    }

    @action updateDestMove(idx: number): number {
        if (this.board[idx] / this.player > 0) return SELECT_STATE.ERROR
        if (this.src === -1) return SELECT_STATE.ERROR

        console.log(this.src, idx)
        sdk.move(this.src, idx)

        this.src = -1

        return SELECT_STATE.MOV_COMPELTE
    }

    @action onJoin = (state: string) => {
        if (state === 'success') {
            this.state = PLAYER_STATE.WAIT
        }
        else if (state === 'error') {
            this.state = PLAYER_STATE.ERROR
        }
    }

    @action onReady = (state: string) => {
        if (state === 'success') {
            this.state = PLAYER_STATE.READY
        }
        else if (state === 'error') {
            this.state = PLAYER_STATE.ERROR
        }
    }

    @action onInit = (side: number) => {
        console.log('side...', side)
        this.player = side
        this.state = PLAYER_STATE.PLAYING
    }

    @action onUpdate = (board: Array<number>) => {
        console.log(board)
        if (board.length < 64) return
        this.board = board
    }

    @action onTurnChange = (turn: number) => {
        this.turn = turn
    }

    @action onGameOver = (winner: number) => {
        this.winner = winner
        this.state = PLAYER_STATE.ENDING
    }
}