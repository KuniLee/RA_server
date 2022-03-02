const express = require('express')
const { Server } = require('socket.io')
const app = express()
const http = require('http')
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('a user connected: ', socket.id)
  socket.on('chat message', (msg) => {
    console.log(msg)
    // io.emit('chat message', msg)
  })
})

module.exports = { io, app, server }
