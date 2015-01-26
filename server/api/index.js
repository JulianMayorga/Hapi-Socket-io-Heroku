var Hoek = require('hoek');
var Joi = require('joi');

var Game = require('../models/Game');


exports.register = function(server, options, next) {

    options = Hoek.applyToDefaults({
        basePath: ''
    }, options);


    server.route({
        method: 'GET',
        path: options.basePath + '/games/{playerId}',
        config: {
            validate: {
                params: {
                    playerId: Joi.number().min(1).max(2)
                }
            }
        },
        handler: function(request, reply) {

            Game.findOne({}, function(err, game) {

                reply(game);
            });
        }
    });

    server.route({
        method: 'PUT',
        path: options.basePath + '/games/{playerId}',
        config: {
            validate: {
                params: {
                    playerId: Joi.number().min(1).max(2)
                }
            }
        },
        handler: function(request, reply) {

            Game.findByIdAndUpdate(request.payload.id, {
                $set: {
                    board: request.payload.board,
                    winner: request.payload.winner,
                    nextTurn: request.payload.nextTurn
                }
            }, function(err, game) {

                reply(game);
            });
        }
    });

    server.route({
        method: 'POST',
        path: options.basePath + '/games',
        handler: function(request, reply) {

            var emptyBoard = [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null]
            ];

            Game.create({
                winner: null,
                nextTurn: 1,
                board: emptyBoard
            }, function(err, game) {

                reply(game);
            });
        }
    });


    next();
};


exports.register.attributes = {
    name: 'api'
};
