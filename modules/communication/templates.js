/* globals exports */

exports.getRooms = function() {
	var rooms = {
		lobby: {
			connected: 0,
			playerList: {},
			maxPlayers: 300,
			visible: false,
			full: false
		},
		room_2max: {
			connected: 0,
			playerList: {},
			maxPlayers: 2,
			visible: true,
			full: false
		},
		room_3max: {
			connected: 0,
			playerList: {},
			maxPlayers: 3,
			visible: true,
			full: false
		},
		room_4max: {
			connected: 0,
			playerList: {},
			maxPlayers: 4,
			visible: true,
			full: false
		},
		room_5max: {
			connected: 0,
			playerList: {},
			maxPlayers: 5,
			visible: true,
			full: false
		}
	};

	var roomList = Object.keys(rooms);

	return {
		rooms: rooms,
		roomList: roomList
	};
};