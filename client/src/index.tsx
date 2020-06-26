import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'mobx-react'
import { createStore } from './store'
import { Hello } from "./app";
import './index.css'

const rootStore = createStore()

ReactDOM.render(
    <Provider {...rootStore}>
        <Hello compiler="TypeScript" framework="React" />
    </Provider>,
    document.getElementById("example")
);
