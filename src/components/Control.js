import React, { Component } from 'react';
import './Control.css';

class Control extends Component {
	constructor(props) {
		super(props);
	}

  render() {
  	const {
  		currentPlayer,
  		resetGame
  	} = this.props;

    return (
      <div className="control-container">
        <p>Current Player: {currentPlayer}</p>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    );
  }

}

export default Control;
