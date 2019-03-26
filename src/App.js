import React, { Component } from 'react';
import './App.css';
import Utils from './Utils';
import { LS_KEY } from './Consts';


//app component imports
import Board from './components/Board';

class App extends Component {

	componentWillMount() {
		//if no local store of score history, initialize
		if (!Utils.GetLocalStoreScore(LS_KEY['player'])) {
			Utils.InitLocalStorage();
		}
	}


  render() {
    return (
      <div className="app-container">
        <h2>React: Tic-Tac-Toe App</h2>
        <Board />
      </div>
    );
  }
}

export default App;
