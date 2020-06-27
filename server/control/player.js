class Player {
  constructor(ws) {
    this.ws = ws
    this.ws.on('message', data => {
      this.handleMsg(data)
    })
    this.ws.on('close', () => {
      this.onClose()
    })
  }

  init(site, game) {
    this.site = site
    this.game = game
  }

  move(src, dest) {}

  handleMsg(data) {
    return
  }

  onClose() {}
}
