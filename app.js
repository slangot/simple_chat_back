const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log('Server is Started', PORT);
});

const io = require('socket.io')(server);

const connectedUser = new Set();

io.on('connection', (socket) => {
    console.log("Connected Successfully", socket.id);
    connectedUser.add(socket.id);
    io.emit('connected-user', connectedUser.size);
    socket.on('disconnect', () => {
      console.log("Disconnected", socket.id);
      connectedUser.delete(socket.id);
      io.emit('connected-user', connectedUser.size);
    });

    socket.on('message', (data) => {
      console.log(data);
      socket.broadcast.emit('message-receive', data);
    });
});