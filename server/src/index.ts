const express = require("express")
const socketIo = require("socket.io")
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on("connection", (socket: any) => {
  console.log("client connected: ", socket.id)

  socket.on("send-text", (data: any, room: any) => {
    socket.broadcast.to(room).emit("receive-text", data)
  })

  socket.on("join-room", (data: any) => {
    socket.join(data)
  })

  socket.on("disconnect", (reason: any) => {
    console.log(reason)
  })
})

server.listen(PORT, (err: any) => {
  if (err) console.log(err)
  console.log("Server running on Port ", PORT)
})