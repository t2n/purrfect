/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        loadedRooms,
        joinedRoom,
        joinRoom,
        loadRooms,
        sendPlayer,
        gameLeave,
        gotPlayer,
        updateLobby,
        playerRemove,
        roomNotAvailable,
        setID,
        init,
        moduleSocket,
        gameFinished,
        finishGame;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('welcome', setID);
        moduleSocket.on('loadedRooms', loadedRooms);
        moduleSocket.on('joinedRoom', joinedRoom);
        moduleSocket.on('gameLeave', gameLeave);
        moduleSocket.on('gotPlayer', gotPlayer);
        moduleSocket.on('updateLobby', updateLobby);
        moduleSocket.on('playerRemove', playerRemove);
        moduleSocket.on('finishGame', finishGame);
        moduleSocket.on('roomNotAvailable', roomNotAvailable);
    };

    setID = function (id) {
        module.publish('purrfect.cache.set', {key: 'myPlayer', value: 'player-' + id + '-' + +new Date()});
    };

    playerRemove = function (id) {
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            game = module.publish('purrfect.cache.get', 'gameData').cached;

        if (players[id] && players[id].parent) {
            players[id].parent.removeChild(players[id].nameTag);
            players[id].parent.removeChild(players[id]);
        }

        if (players[id]) {
            delete players[id];
        }

        if (game.players[id]) {
            delete game.players[id];
        }

        // remove player avatar
        $('[data-id="'+id+'"]').remove();

        module.publish('purrfect.cache.set', {key: 'gamePlayers', value: players});
    };

    roomNotAvailable = function() {
        alert('This room is currently not available');
    };

    loadedRooms = function (rooms) {
        module.publish('purrfect.view.home.handleRooms', rooms);
    };

    joinedRoom = function (data) {
        module.publish('purrfect.cache.set', {key: 'gameData', value: data});
        module.publish('purrfect.view.game', data);
    };

    joinRoom = function (room) {
        var data = {
            room: room,
            playerName: module.publish('purrfect.cache.get', 'playerName').cached,
            myPlayer: module.publish('purrfect.cache.get', 'myPlayer').cached
        };

        moduleSocket.emit('joinRoom', data);
    };

    loadRooms = function () {
        moduleSocket.emit('loadRooms');
    };

    sendPlayer = function (player) {
        var data = {
            id: player.id,
            x: player.position.x,
            y: player.position.y,
            score: player.score,
            avatar: player.avatar
        };
        moduleSocket.emit('sendPlayer', data);
    };

    gameFinished = function (winnersName) {
        moduleSocket.emit('gameFinished', winnersName);
    };

    gotPlayer = function (player) {
        module.publish('purrfect.view.game.player.update', player);
    };

    updateLobby = function (count) {
        module.publish('purrfect.view.home.handleLobbyCount', count);
    };

    finishGame = function (name) {
        module.publish('purrfect.view.game.showEndGame', name);
        module.publish('purrfect.view.game.loop.finishGame');
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.joinRoom', 'main', joinRoom);
    module.subscribe(moduleName + '.loadRooms', 'main', loadRooms);
    module.subscribe(moduleName + '.sendPlayer', 'main', sendPlayer);
    module.subscribe(moduleName + '.gameFinished', 'main', gameFinished);

}(_li.define('purrfect.communication.all')));