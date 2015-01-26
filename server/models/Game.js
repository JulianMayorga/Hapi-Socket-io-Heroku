var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  winner: Number,
  nextTurn: Number,
  board: []
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
