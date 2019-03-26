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
        <div className="box" box-index={boxIndex} onClick={this.handleBoxClick}>
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
