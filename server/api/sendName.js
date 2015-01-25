module.exports = function(socket) {
    socket.emit('socket:send:name', {
        name: 'Bob'
    });
};