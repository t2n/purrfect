/* globals require, console */

// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('VOivKM5qFFM23iyG');

// welcome

// npm modules
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


// custom modules
var banner = require('./modules/banner');
var bootstrap = require('./modules/bootstrap');
var router = require('./modules/router');
var communication = require('./modules/communication');

// middlewarez bullcrap
bootstrap.setup(app);

// routing
router.route(app);

server.listen(app.get('port'), function () {
    console.log('   express  - '.cyan + 'started (' + app.get('port') + ')');
    // oh hai!
    banner.start();
});

io.sockets.on('connection', function (socket) {
    communication.onConnection(socket, io);
});

io.configure(function () {
    'use strict';

    io.enable('browser client etag');
    io.set('log level', 3);

});