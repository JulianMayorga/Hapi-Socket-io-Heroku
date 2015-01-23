var Composer = require('./index');
var SocketIO = require('socket.io');
Composer(function(err, server) {
    if(err) {
        throw err;
    }
    var io = SocketIO.listen(server.listener);
    io.sockets.on('connection', function(socket) {
        socket.emit('socket:send:name', {
            name: 'Bob'
        });
    });
    server.start(function() {
        console.log('Started the plot device.');
    });
});