import React, { Component } from 'react';
import './Board.css';
import Utils from '../Utils';

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
  }

  handleBoxClick(evt) {
    evt.preventDefault();
    let boxIndex = evt.target.getAttribute('box-index');
    let updatedBoxes = [...this.state.boxes];
    let currentPlayer = this.state.currentPlayer;
    
    //update target box with current player value only if null (empty) and no current winner
    if (updatedBoxes[boxIndex] === null && !this.state.winner) {
      updatedBoxes[boxIndex] = currentPlayer;
      const hasWinner = Utils.CheckForWinner(updatedBoxes)
      //if has winner, update winner and boxes on state,
      //if no winner, update boxes and current player
      //set state with updated box values and change player and then check for winner
      if (hasWinner) {
        this.setState({
          winner: true,
          boxes: updatedBoxes
        });
      } else {
        this.setState({
          currentPlayer: currentPlayer === PlayerMap['player1'] ? PlayerMap['player2'] : PlayerMap['player1'],
          boxes: updatedBoxes
        });
      }

    }
    
  }

  resetGame(evt) {
    evt.preventDefault();
    let emptyBoxes = [null, null, null, null, null, null, null, null, null];
    this.setState({
      boxes: emptyBoxes,
      winner: false,
      currentPlayer: PlayerMap['player1']
    });
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
