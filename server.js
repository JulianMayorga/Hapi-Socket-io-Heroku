var mongoose = require('mongoose');

var Composer = require('./index');
var Config = require('./config');
var Socket = require('./server/api/socket');

var socket;


Composer(function(err, server) {
  if (err) {
    throw err;
  }

  socket = Object.create(Socket);

  socket.initialize(server.listener);

  mongoose.connect(Config.get('/db/url'));

  server.start(function() {
    console.log('Started the plot device.');
  });
});
