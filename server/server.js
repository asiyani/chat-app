const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');


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


    socket.on('createLocationMessage', (coords) => {
        console.log('create Message', coords);
        socket.broadcast.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

});




server.listen(port, () => {
    console.log('Listening to PORT:', port);
})