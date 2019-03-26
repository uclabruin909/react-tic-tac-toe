import React, { Component } from 'react';
import './Board.css';

import Box from './Box';
import Control from './Control';

//player mapping used to determine input value
const PlayerMap = {
  player1: 'X',
  player2: 'O'
};

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      //default to player1 (X)
      currentPlayer: PlayerMap['player1'],
      winner: false,
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
    this.resetGame = this.resetGame.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
  }

  handleBoxClick(evt) {
    evt.preventDefault();
    let boxIndex = evt.target.getAttribute('box-index');
    let updatedBoxes = [...this.state.boxes];
    let currentPlayer = this.state.currentPlayer;
    
    //update target box with current player value only if null (empty) and no current winner
    if (updatedBoxes[boxIndex] === null && !this.state.winner) {
      updatedBoxes[boxIndex] = currentPlayer;
      //set state with updated box values and change player and then check for winner
      this.setState({
        boxes: updatedBoxes,
        currentPlayer: this.state.currentPlayer === PlayerMap['player1'] ? PlayerMap['player2'] : PlayerMap['player1']
      }, () => {
        this.checkForWinner();
      });

    }
    
  }

  resetGame(evt) {
    evt.preventDefault();
    let emptyBoxes = [null, null, null, null, null, null, null, null, null];
    this.setState({
      boxes: emptyBoxes,
      currentPlayer: PlayerMap['player1']
    });
  }

  checkForWinner() {
    //all potential winning lines
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],      
    ];

    for (let i=0; i<winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      const currentBoxes= this.state.boxes;
      //compare on current boxes
      if (currentBoxes[a] && currentBoxes[a] === currentBoxes[b] && currentBoxes[a] === currentBoxes[c]) {
        this.setState({
          winner: true
        });
      }
    }


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
      <div className="board-container">
        <Control 
          currentPlayer={this.state.currentPlayer} 
          winner={this.state.winner}
          resetGame={this.resetGame}
        />
        <div className="board">
          {this.renderBoxElements()}
        </div>
      </div>
    );
  }

}

export default Board;
