let board = {
  layout() {
    return [
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      'S', 'S', 'S', 'S'
    ]
  },
  emptyLayout() {
    return [
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      '', '', '', ''
    ]
  },
  shuffleTiles() {
    let tiles = this.layout()
    for (var i = tiles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }
    return tiles;
  }
}

module.exports = board
