export default App.cable.subscriptions.create('GameChannel', {
  sendTiles(tiles) {
    this.perform('send_tiles', {tiles: tiles});
  }
})
