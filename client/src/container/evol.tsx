import * as React from 'react'
import GameStore from '../store/game.store'
import { PIECES } from '../utils/constant'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Square from '../component/square'
import { backgroundImagePiece } from '../utils'

interface IEvolProps {
    gameStore?: GameStore
}

@observer
export default class Evol extends React.Component<IEvolProps>{
    @observable listPiece = [PIECES.QUEEN, PIECES.ROOK, PIECES.BISHOP, PIECES.KNIGHT]
    renderSquare(piece: number) {
        const style = backgroundImagePiece(piece)
        return <Square
            key={piece}
            style={style}
            onClick={() => {
                this.onClick(piece)
            }}
        />
    }

    onClick = (piece: number) => {
        this.props.gameStore.evolution(piece)
    }

    render() {
        return (
            <div>
                {this.listPiece.map(value => {
                    return this.renderSquare(value * this.props.gameStore.turn)
                })}
            </div>
        )
    }
}