import React from 'react';

export default class GameStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const wait_info = (<span>waiting for second player</span>);
    const play_info = (<span>fight arrr!!!</span>);
    return(
      <div>
        <p>Game Status: {this.props.status == 'waiting' ? wait_info : play_info}</p>
      </div>
    );
  }
}
