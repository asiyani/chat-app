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
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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


var locationButton = jQuery('#sendLocation');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('This browswer does not support location');
    }

    navigator.geolocation.getCurrentPosition(function (position) {

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function (err) {
        alert('Unable to fetch location');
    })

});