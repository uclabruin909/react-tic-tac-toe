import React, { Component } from 'react';
import './Board.css';
import { PlayerMap } from '../Consts';
import Utils from '../Utils';

import Box from './Box';
import Control from './Control';


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
      boxes: new Array(9).fill(null)
    };

    this.handleBoxClick = this.handleBoxClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.resetPastScores = this.resetPastScores.bind(this);

  }

  componentWillMount() {
    this.setScoresFromLocalStorage();
  }  

  isWinner(boxes, player) {
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
      //compare on current boxes
      if (boxes[a] === player && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return true;
      }
    }

    return false;   
  }

  isTie(board) {
    let isTie = board.every((box) => {
      return box !== null;
    });
    return isTie;
  }

  copyBoard(boxes) {
    return [...boxes];
  }

  //checks move if valid, if valid then place move and return updated board
  isValidMove(move, player, board) {
    let newBoard = this.copyBoard(board);
    //only set board move if board box is 'null'
    if (newBoard[move] === null) {
      newBoard[move] = player;
      return newBoard;
    } else {
      return false;
    }
  }

  findAiMove(board) {
    let bestMoveScore = 100;
    let move = null;
    //test all possible moves if game is not over
    if (this.isWinner(board, PlayerMap['player']) || this.isWinner(board, PlayerMap['computer']) || this.isTie(board)) {
      return false;
    }
    for (let i=0; i<board.length; i++) {
      let newBoard = this.isValidMove(i, PlayerMap['computer'], board);
      //if isValidMove, return updated valid game board
      if (newBoard) {
        let moveScore = this.calcMaxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  calcMinScore(board) {
    if (this.isWinner(board, PlayerMap['player'])) {
      return 10;
    }
    else if (this.isWinner(board, PlayerMap['computer'])) {
      return -10;
    } 
    else if (this.isTie(board)) {
      return 0;
    }
    else {
      let bestMoveValue = 100;

      for (let i = 0; i < board.length; i++) {
        let newBoard = this.isValidMove(i, PlayerMap['computer'], board);
        if (newBoard) {
          let nextMoveValue = this.calcMaxScore(newBoard);
          if (nextMoveValue < bestMoveValue) {
            bestMoveValue = nextMoveValue;
          }
        }
      }  
      return bestMoveValue;  
    }

  }

  calcMaxScore(board) {
    if (this.isWinner(board, PlayerMap['player'])) {
      return 10;
    }
    else if (this.isWinner(board, PlayerMap['computer'])) {
      return -10;
    } 
    else if (this.isTie(board)) {
      return 0;
    }
    else {
      let bestMoveValue = -100;

      for (let i = 0; i < board.length; i++) {
        let newBoard = this.isValidMove(i, PlayerMap['player'], board);
        if (newBoard) {
          let nextMoveValue = this.calcMinScore(newBoard);
          if (nextMoveValue > bestMoveValue) {
            bestMoveValue = nextMoveValue;
          }
        }
      }  
      return bestMoveValue;  
    }

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
      const hasWinner = Utils.CheckForWinner(updatedBoxes);
      //if has winner, update winner and boxes on state,
      //if no winner, update boxes and current player
      //set state with updated box values and change player and then check for winner
      if (hasWinner) {
        this.setState({
          winner: true,
          boxes: updatedBoxes
        }, () => {
          this.updatePastScore('player');
        });
      } 
      else {
        this.setState({
          currentPlayer: currentPlayer === PlayerMap['player'] ? PlayerMap['computer'] : PlayerMap['player'],
          boxes: updatedBoxes
        }, () => {
          //play computers's move
          this.simulateComputerMove();
        });
      }
    }
    
  }

  simulateComputerMove() {
    let currentBoard = [...this.state.boxes];
    //calculate best move for AI, will return index
    let nextBestAiMove = this.findAiMove(currentBoard);
    currentBoard[nextBestAiMove] = PlayerMap['computer'];
    //determine if computer's move makes them the winner
    let isComputerWinner = Utils.CheckForWinner(currentBoard);
    //if computer is winner, then set winner to true and update 
    if (isComputerWinner) {
      this.setState({
        winner: true,
        boxes: currentBoard
      }, () => {
        this.updatePastScore('computer');
      });
    }
    else {
      this.setState({
        currentPlayer: this.state.currentPlayer === PlayerMap['player'] ? PlayerMap['computer'] : PlayerMap['player'],
        boxes: currentBoard
      });
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
