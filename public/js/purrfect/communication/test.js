/*global _li, console*/

(function(module) {
	'use strict';

	var moduleName = module.get('name'),
		init,
		moduleSocket,
		logMessage;

	init = function(socket) {
		moduleSocket = socket;
		moduleSocket.on('hello', logMessage);
	};

	logMessage = function (message) {
		console.log(message);
	};

	module.subscribe(moduleName, 'main', init);


}(_li.define('purrfect.communication.test')));