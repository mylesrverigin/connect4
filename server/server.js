const express = require('express');
const http = require('http')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


// game things 
const Game = require('./logic/connect4');
game = new Game()

let players = []
let win = false

//// test board 
game.placePiece('F', 0)
game.placePiece('X', 1)
game.placePiece('F', 2)
game.placePiece('X', 3)
game.placePiece('F', 4)
game.placePiece('X', 5)


console.log('t', game.isWin())

io.on('connection', socket => {
  console.log('NEW connection')// id to use socket.handshake.auth
  // socket.broadcast.emit sends to everybody but the user 
  // socket.broadcast.emit('boardupdate','some joined')

  // socket.emit sends to only who connects
  socket.emit('join', JSON.stringify({
    board: game.returnBoard(),
    iswin: win}))

  socket.on('disconnect', () => {
    console.log('disconnect')
    // message to everybody io.emit()
    io.emit('message', 'Someone Left')
  })

  // listen for test function 
  socket.on('test', (payload) => {
    // console.log(JSON.parse(payload).test)
    io.emit('boardupdate', JSON.stringify(game.returnBoard()))
  })

  // listen for placepiece function 
  socket.on('placepiece', (payload) => {
    if (win) { return }
    let { move, id } = JSON.parse(payload)
    move = parseInt(move)
    // check if valid move here 
    if (game.placePiece(id, move)) {
      win = game.isWin() ? id : false
      io.emit('boardupdate', JSON.stringify({
        board: game.returnBoard(),
        iswin: win
      }))
    }

  })

  // listen for player que
  socket.on('addplayer', () => {
    // keep it simple id will just be player idx
    let id = players.length + 1
    players.push(id)
    console.log(players)
    socket.emit('id', id)
  })

  socket.on('newgame', () => {
    players = []
    win = false
    game.newGame()
    io.emit('idwipe', true)
    io.emit('boardupdate', JSON.stringify({
      board: game.returnBoard(),
      iswin: win
    }))
  })
})

const PORT = 5000;
server.listen(PORT, () => { console.log(`Running server on ${PORT}`) })
