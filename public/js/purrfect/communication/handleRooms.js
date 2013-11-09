/*global _li, console, _*/

(function (module, _) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        moduleSocket,
        handleRooms,
        getRooms,
        joinRoom,
        visibleRooms;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('room_list', handleRooms);
    };

    handleRooms = function (rooms) {
        visibleRooms = _.filter(rooms, function (room) {
            return room.visible === true;
        });
        module.publish('purrfect.view.home.handleRooms', visibleRooms);
    };

    getRooms = function () {
        moduleSocket.emit('get_room');
    };

    joinRoom = function(roomName) {
        moduleSocket.emit('join_room', roomName);
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.getRooms', 'main', getRooms);
    module.subscribe(moduleName + '.joinRoom', 'main', joinRoom);


}(_li.define('purrfect.communication.handleRooms'), _));