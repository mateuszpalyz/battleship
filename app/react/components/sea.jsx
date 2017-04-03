import React from 'react';
import GameStatus from './game_status';
import Tile from './tile';
import Firebase from 'firebase';

export default class Sea extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(props.firebase_config);
    this.auth = Firebase.auth();
    this.database = Firebase.database();
    this.auth.signInAnonymously();
    this.gamesRef = this.database.ref('/games');
    this.onTileClick = this.onTileClick.bind(this);
    this.onTileBlackClick = this.onTileBlackClick.bind(this);
    this.matchPlayers();

    const board = [
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      'S', 'S', 'S', 'S'
    ]

    this.state = {
      tiles: this.shuffleTiles(board.slice()),
      tilesForOpponent: board.slice(),
      status: 'waiting'
    };
  }

  matchPlayers() {
    this.gamesRef.limitToLast(1).once('child_added').then((snapshot) => {
      if (snapshot.val().player2 != null) {
        let newGame = this.gamesRef.push({ player1: this.auth.currentUser.uid });
        this.player2Ref = this.database.ref(`games/${newGame.key}/player2`);
        this.player2Ref.on('value', (snapshot)=> {
          if (snapshot.val() != null) this.setState({ status: 'started' });
        });
      } else {
        this.setState({ status: 'started' });
        var updates = {}
        updates[snapshot.key] = { player1: snapshot.val().player1, player2: this.auth.currentUser.uid };
        this.gamesRef.update(updates);
      }
    });
  }

  shuffleTiles(tiles) {
    for (var i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }
    return tiles;
  }

  onTileClick(position, player) {
    if (this.state.status === 'waiting') {
      alert('Game has not started yet!')
    } else {
      const tiles = this.state.tiles;
      if ( (tiles[position] === 'X' || tiles[position] === 'I') ) return;
      if (tiles[position] === 'S') tiles[position] = 'X';
      this.setState({tiles: tiles, turn: player === 'I' ? 'X' : 'O'});
    }
  }

  onTileBlackClick(position, player) {
    if (this.state.status === 'waiting') {
      alert('Game has not started yet!')
    } else {
      const tiles = this.state.tilesForOpponent;
      if ( (tiles[position] === 'X' || tiles[position] === 'I') ) return;
      if (tiles[position] === 'S') tiles[position] = 'X';
      this.setState({tiles: tiles, turn: player === 'I' ? 'X' : 'O'});
    }
  }

  render() {
    return (
      <div>
        <GameStatus status={this.state.status}/>
        <div className='game-container'>
          <div className='board'>
            { this.state.tiles.map(function(tile, position) {
              return(
                <Tile status={tile} key={position} position={position} turn={this.state.turn} onTileClick={this.onTileClick} />
              );
            }, this) }
          </div>
          <div className='board'>
            { this.state.tilesForOpponent.map(function(tile, position) {
              return(
                <Tile status={tile} key={position} position={position} turn={this.state.turn} onTileClick={this.onTileBlackClick} />
              );
            }, this) }
          </div>
        </div>
      </div>
    );
  }
}
