var Hoek = require('hoek');


exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);


    server.route({
        method: 'GET',
        path: options.basePath + '/',
        handler: function (request, reply) {

            var db = request.server.plugins['hapi-mongodb'].db;
            db.collection('logs').insert({a: 23}, function (err, log) {

                reply({ message: 'Welcome to the plot device.' });
            });
        }
    });


    next();
};


exports.register.attributes = {
    name: 'api'
};
