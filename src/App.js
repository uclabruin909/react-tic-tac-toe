import React, { Component } from 'react';
import './App.css';
import Utils from './Utils';


//app component imports
import Board from './components/Board';

class App extends Component {

	componentWillMount() {
		//if no local store of score history, initialize
		if (!Utils.GetLocalStoreScore('player')) {
			Utils.InitLocalStorage();
		}
	}


  render() {
    return (
      <div className="app-container">
        <h2>Kevin Kim's: Tic-Tac-Toe React App</h2>
        <p>Without Computer AI Logic</p>
        <Board />
      </div>
    );
  }
}

export default App;
