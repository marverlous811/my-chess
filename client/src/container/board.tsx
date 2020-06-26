import * as React from 'react'
import GameStore from '../store/game.store'
import { observer, inject } from 'mobx-react'
import Square from '../component/square'
import { isEven, backgroundImagePiece } from '../utils'
import { toJS } from 'mobx'

interface IBoardProps {
    gameStore?: GameStore
}

@inject('gameStore')
@observer
export default class Board extends React.Component<IBoardProps>{
    componentWillMount() {
        this.props.gameStore.initBoard()
    }
    renderSquare(i: number, shade: string) {
        return <Square key={i} shade={shade} style={backgroundImagePiece(this.props.gameStore.board[i])} />
    }

    render() {
        console.log('test', toJS(this.props.gameStore.board))
        const board = []
        for (let i = 0; i < 8; i++) {
            const squareRows = []
            for (let j = 0; j < 8; j++) {
                const squareShade = ((isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))) ? 'light-square' : 'dark-square'
                squareRows.push(this.renderSquare((i * 8 + j), squareShade))
            }
            board.push(<div key={'row-' + i} className="board-row">{squareRows}</div>)
        }

        return <div>{board}</div>
    }
}