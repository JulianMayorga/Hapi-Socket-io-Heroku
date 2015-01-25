var Composer = require('./index');
var Socket = require('./server/api/socket');

var socket;

Composer(function(err, server) {
    if (err) {
        throw err;
    }

    socket = Object.create(Socket);

    socket.initialize(server.listener);

    server.start(function() {
        console.log('Started the plot device.');
    });
});
