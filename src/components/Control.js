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
    	<p><strong>Past Record:</strong> Player: {playerPastScore} | Computer: {computerPastScore}</p>
      <p><strong>Turn:</strong> {currentPlayerKey.toUpperCase()}</p>
      <p><strong>Winner:</strong> {winner ? `${currentPlayerKey.toUpperCase()} is the winner!`: 'No winner yet'}</p>
      <div className="control-buttons">
	      <button className="btn btn-primary" onClick={resetGame}>Reset Game</button>
	      <button className="btn btn-warning" onClick={resetPastScores}>Reset Past Record</button>
      </div>
    </div>
  );

}

export default Control;
