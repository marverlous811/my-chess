import * as React from "react";
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Board from "./container/board";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
@observer
export class Hello extends React.Component<HelloProps, {}> {
    @observable counter = 0
    @action onClick = () => {
        console.log('onClick...', this.counter)
        this.counter++
    }
    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}! Click {this.counter}</h1>
                <button onClick={this.onClick}>Click</button>

                <div className="game">
                    <div className="game-board">
                        <Board />
                    </div>
                </div>
            </div>
        )
    }
}
