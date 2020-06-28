const uri = 'ws://192.168.1.15:31798'

export interface ISdkObservable {
    onJoin?: (state: string) => void
    onReady?: (state: string) => void
    onInit?: (side: number) => void
    onMove?: () => void
    onGameOver?: () => void
    onLeave?: () => void
}

export class GameSDK {
    listener: ISdkObservable
    ws: WebSocket
    pingInterval: number
    constructor() { }

    addListener(listener: ISdkObservable) {
        this.listener = listener
    }

    connectRoom() {
        this.ws = new WebSocket(uri)
        // this.ws.onopen((_e: Event) => console.log('connected server...'))
        this.ws.onopen = this.onConnected
        this.ws.onclose = this.onClose
        this.ws.onmessage = this.handleMsg
    }

    onClose = (e: Event) => {
        console.log('connection close...', e)
        clearInterval(this.pingInterval)
    }

    onConnected = (e: Event) => {
        console.log('on Connected ', e)
        this.pingInterval = setInterval(() => {
            this.ws.send('ping')
        }, 5000)
    }

    //TODO: use event emitter for clean code
    handleMsg = (e: MessageEvent) => {
        const msg = e.data
        if (msg === 'pong') return
        const args = msg.split(':')
        const cmd = args.shift()
        console.log('onMsg: ', cmd, args)
        switch (cmd) {
            case 'join': {
                if (this.listener) this.listener.onJoin(args[0])
                return
            }
            case 'ready': {
                if (this.listener) this.listener.onReady(args[0])
                return
            }
            case 'init': {
                if (this.listener) this.listener.onInit(args[0])
                return
            }
            default: break
        }
    }

    joinRoom(name: string) {
        this.ws.send(`join:${name}`)
    }

    ready() {
        this.ws.send(`ready:`)
    }

    move(src: number, dst: number) {
        this.ws.send(`move:${src}:${dst}`)
    }
}

export const sdk = new GameSDK()