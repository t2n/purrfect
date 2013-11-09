/* globals exports, require, console */

var _ = require('lodash');
var level = require('./level');
var templates = require('./communication/templates').getRooms();
var rooms = templates.rooms;
var lobby = rooms.lobby;
var roomMapping = {};


exports.onConnection = function(socket, io) {

	// update lobby status
	socket.join('lobby');
	roomMapping[socket.id] = 'lobby';
	lobby.playerList[socket.id] = true;
	lobby.connected += 1;

	socket.on('get_room', function() {
		socket.emit('room_list', rooms);
	});
	socket.on('set_name', function(name) {
		rooms[roomMapping[socket.id]].playerList[socket.id] = name;
	});
	socket.on('join_room', function(name) {
		var roomExists = rooms.hasOwnProperty(name);
		var canJoin, room, roomFull, levelInString, inProgress;
		if (roomExists) {
			room = rooms[name];
			console.log(room);
			canJoin = room.connected < room.maxPlayers;
			inProgress = room.inProgress;
			if (inProgress) {
				console.log('game is in progress');
				socket.emit('join_room_fail', 'room is in progress');
			} else if (canJoin) {
				// add player to room
				socket.join(name);
				roomMapping[socket.id] = name;
				room.connected += 1;
				room.playerList[socket.id] = true;

				// update lobby
				lobby.connected -= 1;
				lobby.playerList = _.without(lobby.playerList, socket.id);
				// broadcast change
				io.sockets.emit('room_list', rooms);
				socket.leave('lobby');

				// check if room is full now
				roomFull = room.connected === room.max_players;
				if (roomFull) {
					// ready to start the game!
					levelInString = JSON.stringify(level.generate());
					io.sockets.in(name).emit('ready_to_start', levelInString);
				}
			} else {
				// cannot join - too many players
				console.log('too many players to join ('+socket.id+')');
				socket.emit('join_room_fail', 'too many players in room: '+room.connecter+'/'+room.max_players);
			}
		} else {
			// this room name doesn't exist
			console.log('some hacky bastard tried to kill the app!!');
			console.log(name);
			socket.emit('join_room_fail', 'this room doesn\'t even exist!');
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

		console.log(lobby.playerList);
	});
};