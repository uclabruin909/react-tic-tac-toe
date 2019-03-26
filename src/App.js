import React, { Component } from 'react';
import './App.css';

//app component imports
import Board from './components/Board';

class App extends Component {
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
