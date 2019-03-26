import React, { Component } from 'react';
import './Board.css';

import Box from './Box';

//player mapping used to determine input value
const PlayerMap = {
  player1: 'X',
  player2: 'O'
};

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentPlayer: PlayerMap['player1'],
      //9 boxes total for 3x3 grid. init as null for blank board
      boxes: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,        
      ]
    };

    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  handleBoxClick(evt) {
    evt.preventDefault();
    const boxIndex = evt.target.getAttribute('box-index');
    console.log('Box clicked:', boxIndex);
  }

  renderBoxElements() {
    let boxEls = this.state.boxes.map((boxVal, boxIndex) => {
      return (
        <Box className="box" 
          key={boxIndex}
          boxIndex={boxIndex} 
          boxValue={boxVal} 
          onClickHandler={this.handleBoxClick} 
        />
      );
    });
    return boxEls;
  };

  render() {
    return (
      <div className="board">
        {this.renderBoxElements()}
      </div>
    );
  }

}

export default Board;
