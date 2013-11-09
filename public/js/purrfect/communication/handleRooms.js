/*global _li, console, _*/

(function (module, _) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        moduleSocket,
        handleRooms,
        handleLobby,
        handleMessage,
        getRooms,
        joinRoom,
        startGame,
        visibleRooms;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('room_list', handleRooms);
        moduleSocket.on('room_list', handleLobby);
        moduleSocket.on('room_join_fail', handleMessage);
        moduleSocket.on('joined_room', startGame);
    };

    handleLobby = function (rooms) {
        module.publish('purrfect.view.home.handleLobbyCount', rooms.lobby.connected);
    };

    handleRooms = function (rooms) {
        visibleRooms = _.filter(rooms, function (room) {
            return room.visible === true;
        });
        module.publish('purrfect.view.home.handleRooms', visibleRooms);
    };

    handleMessage = function (message) {
        alert(message);
    };

    getRooms = function () {
        moduleSocket.emit('get_room');
    };

    joinRoom = function (roomName) {
        moduleSocket.emit('join_room', roomName);
    };

    startGame = function () {
        window.location.hash = '#game';
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.getRooms', 'main', getRooms);
    module.subscribe(moduleName + '.joinRoom', 'main', joinRoom);


}(_li.define('purrfect.communication.handleRooms'), _));