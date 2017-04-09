import React from 'react';
import GameStatus from './game_status';
import TurnIndicator from './turn_indicator';
import Tile from './tile';
import Firebase from 'firebase';
import board from '../utils/board';

export default class Sea extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(props.firebase_config);
    this.auth = Firebase.auth();
    this.database = Firebase.database();
    this.auth.signInAnonymously();
    this.gamesRef = this.database.ref('/games');
    this.onTileBlackClick = this.onTileBlackClick.bind(this);
    this.matchPlayers();

    this.state = {
      tiles: board.shuffleTiles(),
      tilesForOpponent: board.emptyLayout(),
      status: 'waiting'
    };
  }

  matchPlayers() {
    this.gamesRef.limitToLast(1).once('child_added').then((snapshot) => {
      if (snapshot.val().player2 != null) {
        let newGame = this.gamesRef.push({ player1: this.auth.currentUser.uid });
        let player2Ref = this.database.ref(`games/${newGame.key}/player2`);
        player2Ref.on('value', (snapshot)=> {
          if (snapshot.val() != null) this.setState({ status: 'started' });
        });
        player2Ref.on('child_added', (snapshot)=> {
          this.updateMyTiles(snapshot.val());
        });
        this.setState({gameId: newGame.key, player: 'player1', turn: 'player1'});
      } else {
        this.setState({ status: 'started' });
        var updates = {}
        updates[snapshot.key] = { player1: snapshot.val().player1, player2: this.auth.currentUser.uid };
        this.gamesRef.update(updates);
        let player1Ref = this.database.ref(`games/${snapshot.key}/player1`);
        player1Ref.on('child_added', (snapshot)=> {
          this.updateMyTiles(snapshot.val());
        });
        this.setState({gameId: snapshot.key, player: 'player2', turn: 'player1'})
      }
      this.hitsRef = this.database.ref(`games/${this.state.gameId}/hits`);
      this.hitsRef.on('child_added', (snapshot)=> {
        this.updateMyShot(snapshot.val());
      });
    });
  }

  updateMyShot(shot) {
    if (shot[0] === this.state.player) {
      let tiles = this.state.tilesForOpponent;
      tiles[shot[1]] = 'X';
      this.setState({tilesForOpponent: tiles});
    }
    this.checkIfWon();
  }

  updateMyTiles(position) {
    let tiles = this.state.tiles;
    if ( (tiles[position] === 'X' || tiles[position] === 'O') ) return;
    if (tiles[position] === 'S') {
      tiles[position] = 'X';
      this.hitsRef.push([this.getOppositePlayer(), position])
    } else {
      tiles[position] = 'O';
    }
    this.setState({tiles: tiles, turn: this.state.player});
    this.checkIfLost();
  }

  onTileBlackClick(position) {
    if (this.state.status === 'waiting') {
      alert('Game has not started yet!');
      return;
    }
    if (this.state.turn !== this.state.player) {
      alert('This is not your turn!');
      return;
    }
    let tiles = this.state.tilesForOpponent;
    if (tiles[position] === 'X' || tiles[position] === 'O') return;
    this.database.ref(`/games/${this.state.gameId}/${this.state.player}`).push(position);

    if (tiles[position] === 'S') {
      tiles[position] = 'X';
    } else {
      tiles[position] = 'O';
    }

    this.setState({tilesForOpponent: tiles, turn: this.getOppositePlayer()});
  }

  getOppositePlayer() {
    if (this.state.player === 'player1') {
      return 'player2';
    } else {
      return 'player1';
    }
  }

  checkIfLost() {
    let sunkenShips = this.state.tiles.filter((t) => {
      return t === 'X';
    }).length
    if (sunkenShips === 4) {
      this.setState({status: 'lost'});
      alert('You lose :(');
    }
  }

  checkIfWon() {
    let sunkenShips = this.state.tilesForOpponent.filter((t) => {
      return t === 'X';
    }).length
    if (sunkenShips === 4) {
      this.setState({status: 'won'});
      alert('You win :)');
    }
  }

  render() {
    const game = (
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
    );
    const wonInfo = (
      <div className='end-game-info'>Game won!!!</div>
    );
    const lostInfo = (
      <div className='end-game-info'>Game lost</div>
    );
    return (
      <div>
        <GameStatus status={this.state.status}/>
        <TurnIndicator turn={this.state.turn} player={this.state.player}/>
        {this.state.status !== 'won' && this.state.status !== 'lost' ? game : ''}
        {this.state.status === 'won' ? wonInfo : ''}
        {this.state.status === 'lost' ? lostInfo : ''}
      </div>
    );
  }
}
