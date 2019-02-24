import React, { Component } from 'react';
import './App.css';

import Piece from 'react-chess-pieces';

const initialPosition = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"]
];


class App extends Component {

  state = {
    pieces: initialPosition,
  }
  
  render() {
    return (
      <div className="App">
        <div className='Board'>
          {this.state.pieces.map((colOfPieces, rowIndex)=> (
            <div className='Row'>
              {colOfPieces.map( (piece, colIndex)=> (
                <div className='Square'>
                  <Piece piece={piece}/>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
