/* globals exports, require */

var _ = require('lodash');

var templates = require('./communication/templates').getRooms();
var rooms = templates.rooms;
var lobby = rooms.lobby;
var roomMapping = {};


exports.onConnection = function(socket) {
	socket.join('lobby');
	socket.on('get_room', function() {
		socket.emit('room_list', rooms);
	});
	socket.on('join_room', function(data) {
		var roomExists = rooms.hasOwnProperty(data.name);
		var canJoin, room;
		if (roomExists) {
			room = rooms[data.name];
			canJoin = room.connected < room.max_players;
			if (canJoin) {
				// add player to room
				socket.join(data.name);
				roomMapping[socket.id] = data.name;
				room.connected += 1;
				room.playerList[socket.id] = true;

				// update lobby
				lobby.connected -= 1;
				lobby.playerList = _.without(lobby.playerList, socket.id);
				// broadcast change
				socket.broadcast.to('lobby').emit('room_list', rooms);
				socket.leave('lobby');

			} else {
				// cannot join - too many players
				console.log('too many players to join ('+socket.id+')');
			}
		} else {
			// this room name doesn't exist
			console.log('some hacky bastard tried to kill the app!!');
		}
	});
	socket.on('disconnected', function() {
		var lastRoom = roomMapping[socket.id],
			room;
		if (!lastRoom) {
			throw('something went wrong... blame chmura.');
		} else {
			room = rooms[lastRoom];
			room.connected -= 1;
			room.playerList = _.without(room.playerList, socket.id);
		}
	});
};