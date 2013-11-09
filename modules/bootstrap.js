/* globals exports, require, process, __dirname */

var path = require('path');
var express = require('express');
var isProduction = (process.env.NODE_ENV === 'production');
var port = (isProduction ? 80 : 8000);

exports.setup = function(app) {
	// all environments
	app.set('port', port);
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '../public')));
	// development only
	if ('development' === app.get('env')) {
		app.use(express.errorHandler());
	}
};