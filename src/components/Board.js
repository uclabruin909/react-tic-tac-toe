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

  renderBoxElements() {
    let boxEls = this.state.boxes.map((boxVal) => {
      return (
        <div className="box">
          {boxVal}
        </div>
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
