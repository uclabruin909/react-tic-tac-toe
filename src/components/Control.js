import React, { Component } from 'react';
import Utils from '../Utils';
import './Control.css';

class Control extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

  render() {
  	const {
  		currentPlayer,
  		winner,
  		resetGame
  	} = this.props;

  	const currentPlayerKey = Utils.GetPlayerKey(currentPlayer)

    return (
      <div className="control-container">
        <p>Current Player: {currentPlayer}</p>
        <p>Winner: {winner ? `${currentPlayerKey} is the winner!`: 'No winner yet'}</p>
        <button className="btn btn-primary" onClick={resetGame}>Reset Game</button>
      </div>
    );
  }

}

export default Control;
