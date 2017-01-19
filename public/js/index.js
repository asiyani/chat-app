'use strict'


var socket = io();
socket.on('connect', () => {
    console.log('connected to server');
});
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (data) => {
    console.log('New Message ',data);
});

// setTimeout(function() {
//     socket.emit('createMessage', {
//        from:'client@example.com',
//        text:'hey whats up'
// })
// }, 4000);
