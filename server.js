/* globals require, console */

// welcome

// npm modules
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);


// custom modules
var banner = require('./modules/banner');
var bootstrap = require('./modules/bootstrap');
var router = require('./modules/router');

// middlewarez bullcrap
bootstrap.setup(app);

// routing
router.route(app);

server.listen(app.get('port'), function () {
    console.log('   express  - '.cyan + 'started (' + app.get('port') + ')');
    // oh hai!
    banner.start();
});