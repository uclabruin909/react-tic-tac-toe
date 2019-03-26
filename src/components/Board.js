import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
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
      ],
    };

  }

  render() {
    return (
      <div className="board">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>                

      </div>
    );
  }
  
}

export default Board;
