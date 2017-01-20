'use strict'


var socket = io();
socket.on('connect', () => {
    console.log('connected to server');
});
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    console.log('New Message ', message);
    var li = jQuery('<li></li>');
    li.text( `${message.from} : ${message.text}` );
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var name = jQuery("[name='userName']").val();
    var message = jQuery("[name='message']").val();
    console.log(name);
    socket.emit('createMessage', {
        from: name,
        text: message
    }, function (data) {
        console.log('Got it!', data);
    });
});