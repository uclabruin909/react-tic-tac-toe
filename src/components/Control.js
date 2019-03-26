import React from 'react';
import Utils from '../Utils';
import './Control.css';


const Control = (props) => {
	let {
		currentPlayer,
		winner,
		playerPastScore,
		computerPastScore,
		resetGame,
		resetPastScores
	} = props;	

	let currentPlayerKey = Utils.GetPlayerKey(currentPlayer);

  return (
    <div className="control-container">
    	<p>Past record: Player: {playerPastScore} | Computer: {computerPastScore}</p>
      <p>Current Player: {currentPlayer}</p>
      <p>Winner: {winner ? `${currentPlayerKey} is the winner!`: 'No winner yet'}</p>
      <button className="btn btn-primary" onClick={resetGame}>Reset Game</button>
      <button className="btn btn-warning" onClick={resetPastScores}>Reset Past History</button>
    </div>
  );

}

export default Control;
