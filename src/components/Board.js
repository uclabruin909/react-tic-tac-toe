import React, { Component } from 'react';
import './Board.css';
import { PlayerMap } from '../Consts';
import Utils from '../Utils';

import Box from './Box';
import Control from './Control';

const defaultBoard = new Array(9).fill(null);

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      //default to player (X)
      currentPlayer: PlayerMap['player'],
      winner: false,
      playerPastScore: null,
      computerPastScore: null,      
      //9 boxes total for 3x3 grid. init as null for blank board
      boxes: defaultBoard
    };

    this.handleBoxClick = this.handleBoxClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.resetPastScores = this.resetPastScores.bind(this);

  }

  componentWillMount() {
    this.setScoresFromLocalStorage();
  }  

  setScoresFromLocalStorage() {
    const playerPastScore = Utils.GetLocalStoreScore('player');
    const computerPastScore = Utils.GetLocalStoreScore('computer');
    this.setState({
      playerPastScore,
      computerPastScore
    });
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
        }, () => {
          this.updatePastScore(Utils.GetPlayerKey(currentPlayer));
        });
      } 
      else {
        this.setState({
          currentPlayer: currentPlayer === PlayerMap['player'] ? PlayerMap['computer'] : PlayerMap['player'],
          boxes: updatedBoxes
        });
      }

      Utils.CalculateBestMove(updatedBoxes);
    }
    
  }

  updatePastScore(playerKey) {
    console.log(playerKey)
    switch (playerKey) {
      case 'player':
        let newPlayerScore = this.state.playerPastScore + 1;
        this.setState({
          playerPastScore: newPlayerScore
        }, () => {
          Utils.SetLocalStorageScore(playerKey, newPlayerScore);
        });
        break;

      case 'computer':
        let newCompScore = this.state.computerPastScore + 1;
        this.setState({
          computerPastScore: newCompScore
        }, () => {
          Utils.SetLocalStorageScore(playerKey, newCompScore);
        }); 
        break;

      default:
        break;     
    }
  }

  resetGame(evt) {
    evt.preventDefault();
    let emptyBoxes = new Array(9).fill(null);;
    this.setState({
      boxes: emptyBoxes,
      winner: false,
      currentPlayer: PlayerMap['player']
    });
  }

  resetPastScores(evt) {
    evt.preventDefault();
    Utils.InitLocalStorage();
    this.setScoresFromLocalStorage();

  }


  renderBoxElements() {
    let boxEls = this.state.boxes.map((boxVal, boxIndex) => {
      return (
        <Box key={boxIndex}
          boxIndex={boxIndex} 
          boxValue={boxVal} 
          onClickHandler={this.handleBoxClick} 
        />
      );
    });
    return boxEls;
  }

  render() {
    return (
      <div className="board-container">
        <Control 
          currentPlayer={this.state.currentPlayer} 
          playerPastScore={this.state.playerPastScore} 
          computerPastScore={this.state.computerPastScore} 
          winner={this.state.winner} 
          resetGame={this.resetGame} 
          resetPastScores={this.resetPastScores}
        />
        <div className="board">
          {this.renderBoxElements()}
        </div>
      </div>
    );
  }

}

export default Board;
