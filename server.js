var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server(3000, {
    views: {
        engines: { html: require('handlebars')},
        path: "./views",
        isCached: false
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});