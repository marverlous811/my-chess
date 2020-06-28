import * as React from "react";
import { observable, action } from "mobx"
import { observer, inject } from "mobx-react"
import Board from "./container/board";
import GameStore from "./store/game.store";
import { sdk } from "./sdk/game.sdk";
import { PLAYER_STATE } from "./utils/constant";

export interface HelloProps {
    compiler: string
    framework: string
    gameStore?: GameStore
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

@inject('gameStore')
@observer
export class Hello extends React.Component<HelloProps, {}> {
    @observable counter = 0
    @observable room: string = ''
    @action onClick = () => {
        console.log('onClick...', this.counter)
        this.counter++
    }

    @action changeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.room = e.target.value
    }

    joinRoom = () => {
        if (!this.room) {
            console.log('not have room name...')
            return
        }
        sdk.joinRoom(this.room)
    }

    ready = () => {
        sdk.ready()
    }

    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}! Click {this.counter}</h1>
                {/* <button onClick={this.onClick}>Click</button> */}

                <input value={this.room} name="room-name" onChange={this.changeRoomName} />
                <button onClick={this.joinRoom}>Join Room</button>
                <button onClick={this.ready}>Ready</button>

                <p>State: {this.props.gameStore.state}</p>
                {this.props.gameStore.state === PLAYER_STATE.PLAYING ?
                    <div>
                        <p>Turn {this.props.gameStore.turn === -1 ? 'BLACK' : 'WHITE'}</p>
                        <div className="game" style={{ marginTop: 10 }}>
                            <br />
                            <div className="game-board">
                                <Board gameStore={this.props.gameStore} />
                            </div>
                        </div>
                    </div> : null}

            </div>
        )
    }
}
