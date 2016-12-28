export default App.cable.subscriptions.create('GameChannel', {
  sendTiles(tiles) {
    this.perform('send_tiles', {tiles: tiles});
  },

  sendShot(tile) {
    this.perform('shot', {tile: tile});
  }
})
