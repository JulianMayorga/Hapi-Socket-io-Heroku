var SocketIO = require('socket.io');

var handlers = require('./handlers');

var socket = {
    initialize: function initialize(listener) {
        this.io = SocketIO.listen(listener);
        this.io.on('connection', handlers);
    }
};

module.exports = socket;