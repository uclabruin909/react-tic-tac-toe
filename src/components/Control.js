import React, { Component } from 'react';
import Utils from '../Utils';
import { LS_KEY } from '../Consts';
import './Control.css';

class Control extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerPastScore: null,
			computerPastScore: null
		};
	}

	componentWillMount() {
		const playerPastScore = Utils.GetLocalStoreScore(LS_KEY['player']);
		const computerPastScore = Utils.GetLocalStoreScore(LS_KEY['computer']);
		this.setState({
			playerPastScore,
			computerPastScore
		});
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
      	<p>Past record: Player: {this.state.playerPastScore} | Computer: {this.state.computerPastScore}</p>
        <p>Current Player: {currentPlayer}</p>
        <p>Winner: {winner ? `${currentPlayerKey} is the winner!`: 'No winner yet'}</p>
        <button className="btn btn-primary" onClick={resetGame}>Reset Game</button>
      </div>
    );
  }

}

export default Control;
