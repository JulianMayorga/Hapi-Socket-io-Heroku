var SocketIO = require('socket.io');

var sendName = require('./sendName');

var socket = {
    initialize: function initialize(listener) {
        this.io = SocketIO.listen(listener);
        this.io.on('connection', sendName);
    }
};

module.exports = socket;