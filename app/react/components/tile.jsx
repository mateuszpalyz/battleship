import React from 'react';

var styleMapping = {
  S: 'dot--almost-white',
  X: 'dot--red dot--animated',
  O: 'dot--almost-black dot--animated'
};

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.onTileClick = this.onTileClick.bind(this);
  }

  onTileClick() {
    this.props.onTileClick(this.props.position, this.props.turn);
  }

  render() {
    return(
      <div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status} onClick={this.onTileClick}>
        <div className={'dot ' + styleMapping[this.props.status]}></div>
      </div>
    );
  }
}
