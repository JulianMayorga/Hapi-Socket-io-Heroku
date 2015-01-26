var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var io = require('socket.io-client');

var Config = require('../../../config');
var Socket = require('../../../server/api/socket');


var lab = exports.lab = Lab.script();
var client, options, request, server, socket, socketURL;


lab.beforeEach(function (done) {

    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });

    socket = Object.create(Socket);
    socket.initialize(server.listener);

    socketURL = server.info.uri;
    options = {
        transports: ['websocket'],
        forceNew: true
    };

    server.start(done);
});

lab.afterEach(function (done) {

    client.disconnect();
    done();
});


lab.experiment('Socket', function () {

    lab.beforeEach(function (done) {

        client = io.connect(socketURL, options);

        done();
    });

    lab.afterEach(function (done) {

        client.disconnect();

        done();
    });


    lab.test('returns socket:send:name message on connection', function (done) {

        client.on('socket:send:name', function (response) {

            Code.expect(response.name).to.equal('Bob');

            done();
        });
    });
});
