import React from 'react';

export default class TurnIndicator extends React.Component {
  render() {
    return(
      <div className='game-status'>
        <p>Now shooting: {this.props.turn == this.props.player ? 'You' : 'Opponent'}</p>
      </div>
    );
  }
}
