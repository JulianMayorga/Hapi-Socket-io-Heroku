var Lab = require('lab');
var Code = require('code');
var mongoose = require('mongoose');

var Config = require('../../../config');
var Hapi = require('hapi');
var IndexPlugin = require('../../../server/api/index');

var Game = require('../../../server/models/Game');


var lab = exports.lab = Lab.script();
var request, server;
var emptyBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
];
var dbUrl = Config.get('/db/url'),
    id;


lab.beforeEach(function(done) {

    var plugins = [IndexPlugin];
    server = new Hapi.Server();
    server.connection({
        port: Config.get('/port/web')
    });
    server.register(plugins, function(err) {

        if (err) {
            return done(err);
        }

        mongoose.connect(dbUrl, function() {

            mongoose.connection.db.dropDatabase(done);
        });
    });
});

lab.afterEach(function(done) {
    mongoose.disconnect(done);
});


lab.experiment('Games Plugin', function() {

    lab.experiment('Create game', function() {

        lab.beforeEach(function(done) {

            request = {
                method: 'POST',
                url: '/games'
            };

            Game.remove(done);
        });

        lab.test('it successfully creates a game', function(done) {

            server.inject(request, function(response) {

                Code.expect(response.statusCode).to.equal(200);
                Code.expect(response.result._id).to.exist();
                Code.expect(response.result.winner).to.be.null();
                Code.expect(response.result.board).to.deep.equal(emptyBoard);
                Code.expect(response.result.nextTurn).to.equal(1);

                done();
            });
        });
    });

    lab.experiment('Player 1', function() {

        lab.experiment('Get game state', function() {

            lab.beforeEach(function(done) {

                request = {
                    method: 'GET',
                    url: '/games/1'
                };

                Game.remove(function() {

                    Game.create({
                        winner: null,
                        board: emptyBoard,
                        nextTurn: 1
                    }, function(err, game) {
                        id = game._id;
                        done();
                    });
                });
            });



            lab.test('it returns current game state', function(done) {

                server.inject(request, function(response) {

                    Code.expect(response.statusCode).to.equal(200);
                    Code.expect(response.result.winner).to.be.null();
                    Code.expect(response.result.board).to.deep.equal(emptyBoard);
                    Code.expect(response.result.nextTurn).to.equal(1);

                    done();
                });
            });
        });

        lab.experiment('Update game state', function() {

            lab.beforeEach(function(done) {

                request = {
                    method: 'PUT',
                    url: '/games/1'
                };

                Game.remove(function() {

                    Game.create({
                        winner: null,
                        board: emptyBoard,
                        nextTurn: 1
                    }, function(err, game) {
                        id = game._id;
                        done();
                    });
                });
            });



            lab.test('it updates the current game state', function(done) {

                var board = [
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    [1, null, null, null, null, null, null]
                ];
                request.payload = {
                    winner: null,
                    nextTurn: 2,
                    board: board,
                    id: id
                };

                server.inject(request, function(response) {

                    Code.expect(response.statusCode).to.equal(200);
                    Code.expect(response.result.winner).to.be.null();
                    Code.expect(response.result.board).to.deep.equal(board);
                    Code.expect(response.result.nextTurn).to.equal(2);

                    done();
                });
            });
        });
    });

    lab.experiment('Player 2', function() {

        lab.experiment('Get game state', function() {

            lab.beforeEach(function(done) {

                request = {
                    method: 'GET',
                    url: '/games/2'
                };

                Game.remove(function() {

                    Game.create({
                        winner: null,
                        board: emptyBoard,
                        nextTurn: 1
                    }, function(err, game) {
                        id = game._id;
                        done();
                    });
                });
            });



            lab.test('it returns current game state', function(done) {

                server.inject(request, function(response) {

                    Code.expect(response.statusCode).to.equal(200);
                    Code.expect(response.result.winner).to.be.null();
                    Code.expect(response.result.board).to.deep.equal(emptyBoard);
                    Code.expect(response.result.nextTurn).to.equal(1);

                    done();
                });
            });
        });
    });

    lab.experiment('Player 3', function() {

        lab.experiment('Get game state', function() {

            lab.beforeEach(function(done) {

                request = {
                    method: 'GET',
                    url: '/games/3'
                };

                Game.remove(function() {

                    Game.create({
                        winner: null,
                        board: emptyBoard,
                        nextTurn: 1
                    }, function(err, game) {
                        id = game._id;
                        done();
                    });
                });
            });



            lab.test('it returns error because only two players are allowed', function(done) {

                server.inject(request, function(response) {

                    Code.expect(response.statusCode).to.equal(400);
                    Code.expect(response.result.message).to.equal('playerId must be less than or equal to 2');

                    done();
                });
            });
        });
    });
});
