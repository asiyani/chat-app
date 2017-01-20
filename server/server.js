const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connect', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('admin','Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin','New user joined'));

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    })


    socket.on('createMessage', (message,callback) => {
        console.log('create Message', message);
        socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
        callback('this is from the server');
    });

});










server.listen(port, () => {
    console.log('Listioning to PORT:', port);
})