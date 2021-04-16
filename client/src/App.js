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
    test:[]
  }

  testemit = () => {
    // running this sends data to server 
    // replace "{ }" with the data
    this.socket.emit('test', JSON.stringify({ test: 'DATA' }))
  }

  componentDidMount() {
    // this just gets the messages the server sends when we connect 
    this.socket.on('message', message => {
      console.log(message)
    })
    // this listener is for data emits ( this is where we will get the updated board ) 
    this.socket.on('data', data => {
      this.setState({
        test:[...this.state.test,data]
      })
    })
    ////
  }

  render() {

    return (
      <>
        <Header/>
        <div className="play-ui">
          <Board/>
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