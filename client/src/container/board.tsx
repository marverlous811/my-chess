import * as React from 'react'
import GameStore from '../store/game.store'
import { observer, inject } from 'mobx-react'
import Square from '../component/square'
import { isEven, backgroundImagePiece, fogImg } from '../utils'
import { toJS, observable } from 'mobx'
import { SELECT_STATE } from '../utils/constant'

interface IBoardProps {
    gameStore?: GameStore
}

@observer
export default class Board extends React.Component<IBoardProps>{
    @observable isSelected = -1
    componentWillMount() {
        this.props.gameStore.initBoard()
    }
    renderSquare(i: number, shade: string) {
        const style = this.props.gameStore.isShowing(i) ? backgroundImagePiece(this.props.gameStore.board[i]) : fogImg()
        return <Square key={i} shade={shade} style={style} onClick={() => {
            this.onClick(i)
        }} />
    }

    onClick = (i: number) => {
        console.log('onClick...', i)
        const state = this.props.gameStore.updateMove(i)
        if (state === SELECT_STATE.SRC_SELECTED) {
            this.isSelected = i
        } else {
            this.isSelected = -1
        }
    }

    render() {
        console.log('test', toJS(this.props.gameStore.board))
        const board = []
        for (let i = 0; i < 8; i++) {
            const squareRows = []
            for (let j = 0; j < 8; j++) {
                let squareShade = ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) ? 'light-square' : 'dark-square'
                //TODO: use auto run to update only 1 square for high performance
                if (this.isSelected === i * 8 + j) {
                    squareShade = '.selected-square'
                }
                squareRows.push(this.renderSquare((i * 8 + j), squareShade))
            }
            board.push(<div key={'row-' + i} className="board-row">{squareRows}</div>)
        }

        return <div>{board}</div>
    }
}