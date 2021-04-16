import './App.css';
import io from 'socket.io-client'
import React, { Component } from 'react'

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
  
  render() {
    // this just gets the message the server sends when we connect 
    this.socket.on('message',message =>{
      console.log(message)
    })
    ////
    return (
      <div className="App">
        HELLO WORLD
      </div>
    );
  }
}

export default App;
