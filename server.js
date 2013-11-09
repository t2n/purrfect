/* globals require, console */

// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('VOivKM5qFFM23iyG');

// npm modules
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var colors = require('colors');
var io = require('socket.io').listen(server);

// custom modules
var bootstrap = require('./modules/bootstrap');
var router = require('./modules/router');
var communication = require('./modules/communication');

// middlewarez bullcrap
bootstrap.setup(app);

// routing
router.route(app);

server.listen(app.get('port'), function() {
	console.log('   express  - '.cyan+'started (' + app.get('port')+')');
});

io.sockets.on('connection', communication.onConnection);