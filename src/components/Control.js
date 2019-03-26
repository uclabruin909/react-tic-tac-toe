import React, { Component } from 'react';
import './Control.css';

class Control extends Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const {
  		currentPlayer,
  		winner,
  		resetGame
  	} = this.props;

    return (
      <div className="control-container">
        <p>Current Player: {currentPlayer}</p>
        <p>Winner: {winner ? 'There is a winner!': 'No winner yet'}</p>
        <button className="btn btn-primary" onClick={resetGame}>Reset Game</button>
      </div>
    );
  }

}

export default Control;
