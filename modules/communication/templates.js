/* globals exports */

exports.getRooms = function() {
	var rooms = {
		lobby: {
			connected: 0,
			playerList: {},
			maxPlayers: 300,
			visible: false
		},
		room_2max: {
			connected: 0,
			playerList: {},
			maxPlayers: 2,
			visible: true
		},
		room_3max: {
			connected: 0,
			playerList: {},
			maxPlayers: 3,
			visible: true
		},
		room_4max: {
			connected: 0,
			playerList: {},
			maxPlayers: 4,
			visible: true
		},
		room_5max: {
			connected: 0,
			playerList: {},
			maxPlayers: 5,
			visible: true
		}
	};

	var roomList = Object.keys(rooms);

	return {
		rooms: rooms,
		roomList: roomList
	};
};