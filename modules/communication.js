/* globals exports, require */

var level = require('./level');
var templates = require('./communication/templates').getRooms();
var rooms = templates.rooms;
var players = {};
var lobbyCounter = 0;
var onConnection = function (socket, io) {
    'use strict';

    lobbyCounter += 1;

    socket.emit('updateLobby', lobbyCounter);
    socket.broadcast.emit('updateLobby', lobbyCounter);


    socket.on('loadRooms', function () {
        socket.emit('loadedRooms', rooms);
        socket.broadcast.emit('loadedRooms', rooms);


    });

    socket.on('joinRoom', function (room) {


        var data,
            startGame = false;

        if (!players[room]) {
            players[room] = {};
        }

        if (!players[room][socket.id]) {
            players[room][socket.id] = {};
        }

        players[room][socket.id] = {
            id: socket.id,
            isMe: false
        };

        if (rooms[room].connected === 0) {
            rooms[room].level = level.generate();
        }

        if (rooms[room].connected === rooms[room].maxPlayers - 1) {
            startGame = true;
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

        players[room][socket.id].isMe = true;
        socket.emit('joinedRoom', data);
        socket.broadcast.emit('loadedRooms', data);

        lobbyCounter -= 1;

        socket.emit('updateLobby', lobbyCounter);
        socket.broadcast.emit('updateLobby', lobbyCounter);

    });

    socket.on('sendPlayer', function (player) {
        var rooms = io.sockets.manager.roomClients[socket.id];
        for (var room in rooms) {
            if (rooms.hasOwnProperty(room) && room.length) {
                var data = {
                    player: player,
                    id: socket.id,
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

                    socket.broadcast.emit('loadedRooms', data);
                    socket.broadcast.to(game).emit('gameLeave', players);

                }
            }
        }

        lobbyCounter -= 1;

        socket.emit('updateLobby', lobbyCounter);
        socket.broadcast.emit('updateLobby', lobbyCounter);
    });

};

exports.onConnection = onConnection;