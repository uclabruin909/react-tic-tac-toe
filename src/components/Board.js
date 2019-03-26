import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <table className="board">
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    );
  }
}

export default Board;
