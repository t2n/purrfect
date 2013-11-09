/* globals exports */

exports.getRooms = function() {
	var rooms = {
		lobby: {
			connected: 0,
			playerList: {},
			maxPlayers: 300,
			visible: false,
			inProgress: false
		},
		room_2max: {
			connected: 0,
			playerList: {},
			maxPlayers: 2,
			visible: true,
			inProgress: false
		},
		room_3max: {
			connected: 0,
			playerList: {},
			maxPlayers: 3,
			visible: true,
			inProgress: false
		},
		room_4max: {
			connected: 0,
			playerList: {},
			maxPlayers: 4,
			visible: true,
			inProgress: false
		},
		room_5max: {
			connected: 0,
			playerList: {},
			maxPlayers: 5,
			visible: true,
			inProgress: false
		}
	};

	var roomList = Object.keys(rooms);

	return {
		rooms: rooms,
		roomList: roomList
	};
};