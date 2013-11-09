/*global _li, console, _*/

(function(module, _) {
	'use strict';

	var moduleName = module.get('name'),
		init,
		moduleSocket,
		handleRooms,
		visibleRooms;

	init = function(socket) {
		moduleSocket = socket;
		moduleSocket.on('room_list', handleRooms);
	};

	handleRooms = function (rooms) {
		visibleRooms = _.filter(rooms, function(room) {
			return room.visible === true;
		});
		console.log('Visible rooms:');
		console.log(visibleRooms);
	};

	module.subscribe(moduleName, 'main', init);


}(_li.define('purrfect.communication.handleRooms'), _));