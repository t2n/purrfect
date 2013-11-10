/* globals exports, require */

var level = require('./level');
var templates = require('./communication/templates').getRooms();
var rooms = templates.rooms;
var players = {};
var playerMappings = {};
var lobbyCounter = 0;
var onConnection = function (socket, io) {
    'use strict';

    lobbyCounter += 1;

    socket.emit('welcome', socket.id);

    socket.emit('updateLobby', lobbyCounter);
    socket.broadcast.emit('updateLobby', lobbyCounter);


    socket.on('loadRooms', function () {
        socket.emit('loadedRooms', rooms);
        socket.broadcast.emit('loadedRooms', rooms);

        for (var room in rooms) {
            if (rooms.hasOwnProperty(room)) {
                if (rooms[room].connected >= rooms[room].maxPlayers) {
                    socket.emit('roomFull', room);
                }
            }
        }

    });

    socket.on('joinRoom', function (incomingData) {
        var data,
            startGame = false,
            room = incomingData.room,
            playerName = incomingData.playerName,
            id = incomingData.myPlayer;

        playerMappings[socket.id] = id;

        if (!players[room]) {
            players[room] = {};
        }

        if (!players[room][id]) {
            players[room][id] = {};
        }

        players[room][id] = {
            id: id,
            name: playerName
        };

        if (rooms[room]) {
            if (rooms[room].connected === 0) {
                rooms[room].level = level.generate();
            }

            if (rooms[room].connected === rooms[room].maxPlayers - 1) {
                startGame = true;
                rooms[room].inProgress = true;
                rooms[room].connected += 1;
            } else if (rooms[room].connected > rooms[room].maxPlayers - 1) {
                socket.emit('roomFull', room);
            } else {
                rooms[room].connected += 1;
            }

            data = {
                room: rooms[room],
                players: players[room],
                startGame: startGame
            };

            socket.join(room);

            socket.broadcast.to(room).emit('joinedRoom', data);
            socket.broadcast.to(room).emit('loadedRooms', data);
            socket.broadcast.emit('loadedRooms', data);
            socket.broadcast.emit('updateLobby', lobbyCounter);
            lobbyCounter -= 1;

            socket.emit('joinedRoom', data);
            socket.emit('updateLobby', lobbyCounter);
        }

    });

    socket.on('sendPlayer', function (player) {
        var rooms = io.sockets.manager.roomClients[socket.id];
        for (var room in rooms) {
            if (rooms.hasOwnProperty(room) && room.length) {
                var data = {
                    player: player,
                    id: player.id,
                    x: player.x,
                    y: player.y
                };

                socket.broadcast.to(room.slice(1)).emit('gotPlayer', data);
            }
        }
    });

    var games = io.sockets.manager.roomClients[socket.id];

    socket.on('disconnect', function () {
        for (var game in games) {
            if (games.hasOwnProperty(game)) {
                if (game.length > 0) {
                    game = game.slice(1);
                    socket.leave(game);
                    rooms[game].connected -= 1;
                    if (rooms[game].connected < 0) {
                        rooms[game].connected = 0;
                    }
                    var data = {
                        room: rooms[game],
                        players: players[game]
                    };

                    if (players[game] && players[game[socket.id]]) {
                        delete players[game][socket.id];
                    }
                    socket.broadcast.emit('loadedRooms', data);
                    socket.broadcast.emit('playerRemove', playerMappings[socket.id]);
                    socket.emit('playerRemove', playerMappings[socket.id]);
                    socket.broadcast.to(game).emit('gameLeave', players);

                }
            }
        }

        lobbyCounter -= 1;
        if (lobbyCounter < 0) {
            lobbyCounter = 0;
        }

        socket.emit('updateLobby', lobbyCounter);
        socket.broadcast.emit('updateLobby', lobbyCounter);

        for (var room in rooms) {
            if (rooms.hasOwnProperty(room)) {
                if (rooms[room].connected >= rooms[room].maxPlayers) {
                    socket.emit('roomVacant', room);
                }
            }
        }

    });

};

exports.onConnection = onConnection;