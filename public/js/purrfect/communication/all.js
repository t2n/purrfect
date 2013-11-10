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
        setID,
        init,
        moduleSocket;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('welcome', setID);
        moduleSocket.on('loadedRooms', loadedRooms);
        moduleSocket.on('joinedRoom', joinedRoom);
        moduleSocket.on('gameLeave', gameLeave);
        moduleSocket.on('gotPlayer', gotPlayer);
        moduleSocket.on('updateLobby', updateLobby);
        moduleSocket.on('playerRemove', playerRemove);

    };

    setID = function (id) {
        module.publish('purrfect.cache.set', {key: 'myPlayer', value: 'player-' + id + '-' + +new Date()});
    };

    playerRemove = function (id) {
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            container = module.publish('purrfect.cache.get', 'gameContainer').cached;

        container.removeChild(players[id].nameTag);
        container.removeChild(players[id]);

        if (players[id]) {
            delete players[id];
        }
        module.publish('purrfect.cache.set', {key: 'gamePlayers', value: players});


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
            y: player.position.y
        };
        moduleSocket.emit('sendPlayer', data);
    };

    gotPlayer = function (player) {
        module.publish('purrfect.view.game.player.update', player);
    };

    updateLobby = function (count) {
        module.publish('purrfect.view.home.handleLobbyCount', count);
    };


    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.joinRoom', 'main', joinRoom);
    module.subscribe(moduleName + '.loadRooms', 'main', loadRooms);
    module.subscribe(moduleName + '.sendPlayer', 'main', sendPlayer);


}(_li.define('purrfect.communication.all')));