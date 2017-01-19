const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connect', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to the chat APP',
            createdAt: new Date().getTime()
        });

    socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'New User Joined',
            createdAt: new Date().getTime()
        });



    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    })


    socket.on('createMessage', (data) => {
        console.log('create Message', data);
        socket.broadcast.emit('newMessage', {
            from: data.from,
            text: data.text,
            createdAt: new Date().getTime()
        });
    });

});










server.listen(port, () => {
    console.log('Listioning to PORT:', port);
})