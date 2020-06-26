import GameStore from './game.store'

export function createStore() {
    const gameStore = new GameStore()
    return {
        gameStore
    }
}