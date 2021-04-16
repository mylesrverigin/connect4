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
})

const PORT = 5000;
server.listen(PORT, ()=>{console.log(`Running server on ${PORT}`)})
