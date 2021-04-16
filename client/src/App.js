import './App.css';
import io from 'socket.io-client';
import React, { Component } from 'react';
import Board from './components/Board/Board';
import Header from './components/Header/Header'
import ControlPanel from './components/ControlPanel/ControlPanel';

export class App extends Component {
  // this connects us to the server 
  socket = io("http://localhost:5000/", {
    reconnectionDelayMax: 10000,
    auth: {
      token: "123"
    },
    query: {
      "my-key": "my-value"
    }
  })

  state = {
    board:[],
    id:false,
    winner:false
  }

  testemit = () => { //will remain Unused just an example  
    // running this sends data to server 
    // replace "{ }" with the data
    this.socket.emit('test', JSON.stringify({ test: 'DATA' }))
  }

  testplacepiece = () => {
    if (!this.state.id){ return }
    this.socket.emit('placepiece', JSON.stringify({ move: this.state.id , id:this.state.id}))
  }

  testplaygame = () => {
    // this puts player into the game que
    // server returns an id we listen for in component did mount
    this.socket.emit('addplayer',{})
  }

  testnewgame = () => {
    // resets the game board and playerque
    this.socket.emit('newgame',{})
  }

  componentDidMount() {
    // this just gets the messages the server sends when we connect 
    this.socket.on('join', data => {
      // this gets us intial board state
      let {board, iswin} = JSON.parse(data)
      this.setState({
        board:[...board],
        winner:iswin
      })
    })
    // this listener is for boardupdates emits ( this is where we will get the updated board ) 
    this.socket.on('boardupdate', data => {
      let {board, iswin} = JSON.parse(data)
      this.setState({
        board:[...board],
        winner:iswin
      })
      console.log(this.state.board)
    })
    //// listen for id update
    this.socket.on('id', id => {
      this.setState({
        id:id
      })
    })
    // listen for newgame id wipe 
    this.socket.on('idwipe', () => {
      this.setState({
        id:false
      })
    })
  }

  render() {

    return (
      <>
        <Header/>
        <div className="play-ui">
          <Board board={this.state.board}/>{/*needs to take board state and update based on what number has changed*/}
          <ControlPanel/>
        </div>
      </>
    );
  }
}

export default App;
/* <div className="App">
//   HELLO WORLD
//   <button onClick={this.testemit}>TEST</button>
//   {this.state.test}
</div>*/