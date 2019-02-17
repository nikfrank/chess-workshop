import React, { Component } from 'react';
import './App.css';

//import Piece from 'react-chess-pieces';

const Piece = ()=> null

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='Board'>
          <div className='Row'>
            <div className='Square'/>
            <div className='Square'/>
            <div className='Square'/>
          </div>
          <div className='Row'>
            <div className='Square'/>
            <div className='Square'/>
            <div className='Square'/>
          </div>
          <div className='Row'>
            <div className='Square'>
              <Piece piece='k'/>
            </div>
            <div className='Square'>
              <Piece piece='r'/>
            </div>
            <div className='Square'>
              <Piece piece='Q'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
