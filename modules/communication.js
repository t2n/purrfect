/* globals exports, require, console */

var _ = require('lodash');
var level = require('./level');
var templates = require('./communication/templates').getRooms();
var rooms = templates.rooms;
var colors = require('colors');
var players = {};
var onConnection = function (socket, io) {
    'use strict';

    socket.on('loadRooms', function () {
        socket.emit('loadedRooms', rooms);
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
        socket.emit('loadedRooms', data);

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
                    players = io.sockets.clients(game).length - 1;
                    if (players < 0) {
                        players = 0;
                    }
                    socket.broadcast.to(game).emit('gameLeave', players);
                }
            }
        }
    });

};

exports.onConnection = onConnection;