const express = require('express');
const http = require('http')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })


// game things 
const Game = require('./logic/connect4');
game = new Game()
game.placePiece('X',1)
game.placePiece('X',1)
game.placePiece('X',2)
game.placePiece('X',2)
game.placePiece('X',3)
game.placePiece('X',3)
console.log('t',game.isWin())

io.on('connection', socket =>{
    console.log('NEW connection')// id to use socket.handshake.auth
    // socket.broadcast.emit sends to everybody but the user 
    socket.broadcast.emit('message','someone joined')

    // socket.emit sends to only who connects
    socket.emit('message','you joined')

    socket.on('disconnect', ()=>{
        console.log('disconnect')
        // message to everybody io.emit()
        io.emit('message','Someone Left')  
    })

    // listen for test function 
    socket.on('test',(payload)=>{
        console.log(JSON.parse(payload).test)
        io.emit('data',JSON.stringify(game.returnBoard()))
    })
})

const PORT = 5000;
server.listen(PORT, ()=>{console.log(`Running server on ${PORT}`)})
