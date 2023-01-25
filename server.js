const express = require('express')
const app = express()
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
  maxHttpBufferSize: 10e8,
  pingTimeout: 60000,
})

// let users = []
// const uniqueUsers = users.reduce((acc, current) => {
//   if (!acc.find((item) => item.id === current.item.id)) {
//     acc.push(current)
//   }
//   return acc
// }, [])
let connectedSockets = []
const generateID = Date.now()

let users = []

io.on('connection', (socket) => {
  socket.data = {}

  socket.on('userCreated', (data) => {
    // console.log(data)
    users.push(data)
    console.log(users)
    io.emit('connectedUsers', users)
  })
  //===================================
  // socket.on('userCreated', async (data) => {
  //   // console.log(data)
  //   socket.data.modelNumber = data.id
  //   socket.data.modelName = data.modelName
  //   console.log(socket.data)
  //   const sockets = await io.fetchSockets()

  //   for (const socket of sockets) {
  //     console.log(socket.id)
  //     users.push(socket.id)
  //   }
  //   io.emit('connectedUsers', users)
  // })

  //=======================================
  // socket.emit(async () => {
  //   const sockets = await io.fetchSockets()
  //   for (const socket of sockets) {
  //     console.log(sockets.id)
  //   }
  //   io.emit('connectedUsers', socket.id)
  // })

  // socket.on('join_game', (data) => {
  //   // console.log(data)
  //   socket.join('room 237')
  //   console.log(`join room ${data}`)
  //   // socket.to(data.room).emit('dataFromServer', data)
  // })
  // socket.on('userCreated', (data) => {
  //   console.log(data)
  //   const { socketID } = data
  //   users.push(socketID)
  //   io.to('room 237').emit('userResponse', users)
  //   console.log(users)
  // })
  // console.log(
  //   `User ${client.id} connected, there are currently ${io.engine.clientsCount} users connected`
  // )
  // console.log(io.engine.clientsCount)
  // console.log(io.sockets.sockets.length)

  socket.on('disconnect', () => {
    socket.broadcast.emit('deletePlayer', { id: socket.id })
  })
})

httpServer.listen(3001, () => {
  console.log('server is running')
})

// setInterval(async function () {
//   const sockets = await io.fetchSockets()
//   // console.log(sockets[0].id)
//   // console.log(connectedSockets)
//   let users = []

//   for (const socket of sockets) {
//     // console.log(socket.data)
//     // console.log(socket.id)

//     if (socket.data.modelName !== undefined) {
//       users.push({
//         id: socket.id,
//         modelName: socket.data.modelName,
//         modelNumber: socket.data.modelNumber,
//       })
//     }

//     console.log(users)
//     // console.log(socket.handshake)
//     // console.log(socket.rooms)
//     // console.log(socket.data)
//     // socket.emit(/* ... */)
//     // socket.join(/* ... */)
//     // socket.leave(/* ... */)
//     // socket.disconnect(/* ... */)
//   }

//   if (users.length > 0) io.emit('remoteData', users)
// }, 10000)
