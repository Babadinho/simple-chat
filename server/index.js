const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

require('dotenv').config();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket, room) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (user, data) => {
    socket.join(data);
    console.log(`User: ${user} with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('participants', async (username, room) => {
    const clients = io.sockets.adapter.rooms.get(room);
    socket.id = username;
    io.sockets.in(room).emit('show_participants', [...clients]);
    console.log([...clients]);

    io.sockets.in(room).emit('joined_users', {
      username: socket.username,
    });
  });

  socket.on('send_message', (data) => {
    io.sockets.in(data.room).emit('receive_message', data);
    console.log(data);
  });

  socket.on('disconnect', (socket) => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

const port = process.env.PORT || 8001;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
