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
        init,
        moduleSocket,
        nameSet,
        setName;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('loadedRooms', loadedRooms);
        moduleSocket.on('joinedRoom', joinedRoom);
        moduleSocket.on('gameLeave', gameLeave);
        moduleSocket.on('gotPlayer', gotPlayer);
        moduleSocket.on('updateLobby', updateLobby);
        moduleSocket.on('nameSet', nameSet);
    };

    nameSet = function (userName) {
        module.publish('purrfect.view.game.player', userName);
    };

    loadedRooms = function (rooms) {
        module.publish('purrfect.view.home.handleRooms', rooms);
    };

    joinedRoom = function (data) {
        module.publish('purrfect.cache.set', {key: 'gameData', value: data});
        module.publish('purrfect.view.game', data);
    };

    gameLeave = function (players) {

    };

    joinRoom = function (room) {
        moduleSocket.emit('joinRoom', room);
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

    setName = function (name) {
        moduleSocket.emit('setName', name);
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.joinRoom', 'main', joinRoom);
    module.subscribe(moduleName + '.loadRooms', 'main', loadRooms);
    module.subscribe(moduleName + '.sendPlayer', 'main', sendPlayer);
    module.subscribe(moduleName + '.setName', 'main', setName);

}(_li.define('purrfect.communication.all')));