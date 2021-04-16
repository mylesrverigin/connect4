import './App.css';
import io from 'socket.io-client';
import React, { Component } from 'react';
import Board from './components/Board/Board';
import Header from './components/Header/Header'
import ControlPanel from './components/ControlPanel/ControlPanel';
import WinBanner from './components/WinBanner/WinBanner';
import TA_Img_1 from './assests/images/TA_img_1.png';
import TA_Img_2 from './assests/images/TA_img_2.png';
import TA_Img_3 from './assests/images/TA_img_3.png';
import TA_Img_4 from './assests/images/TA_img_4.png';
import TA_Img_5 from './assests/images/TA_img_5.png';

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
    id: false,
    winner: false,
    images: [TA_Img_1, TA_Img_2, TA_Img_3, TA_Img_4, TA_Img_5]
  }

  testemit = () => { //will remain Unused just an example  
    // running this sends data to server 
    // replace "{ }" with the data
    this.socket.emit('test', JSON.stringify({ test: 'DATA' }))
  }

  winBanner = () => {

  }

  placePiece = (column) => {
    if (!this.state.id){ return }
    this.socket.emit('placepiece', JSON.stringify({ move: column , id: this.state.id}))
  }

  playGame = () => {
    // this puts player into the game que
    // server returns an id we listen for in component did mount
    this.socket.emit('addplayer',{})
  }

  newGame = () => {
    // resets the game board and playerque
    this.socket.emit('newgame',{})
  }

  cellListener = (column) => {
    console.log(column)
    this.placePiece(column)
  }

  componentDidMount() {
    // this just gets the messages the server sends when we connect 
    this.socket.on('join', data => {
      // this gets us intial board state
      let {board, iswin} = JSON.parse(data)
      this.setState({
        board:[...board],
        winner: iswin
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

  displayWinBanner = () => {
    if(!this.state.winner){
      return (
        <Board 
        images={this.state.images}
        board={this.state.board}
        cellListener={this.cellListener}
        />
      )
    }else{
        return <WinBanner image={this.state.images[this.state.winner]}/>
    }
  }

  render() {

    return (
      <>
        <Header/>
        <div className="play-ui">
          {this.displayWinBanner()}
          <ControlPanel
            playGame={this.playGame}
            newGame={this.newGame}
          />
        </div>
      </>
    );
  }
}

export default App;