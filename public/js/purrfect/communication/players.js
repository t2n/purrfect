/*global _li, io, location*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        moduleSocket = null,
        updatePlayer,
        sendPlayer,
        addPlayer,
        init;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('addPlayer', addPlayer);
        moduleSocket.on('updatePlayer', updatePlayer);
    };

    updatePlayer = function (data) {
        module.publish('purrfect.view.game.player.update', data);
    };

    addPlayer = function (data) {
        module.publish('purrfect.view.game.loop.update', data);
    };

    sendPlayer = function(data) {
        moduleSocket.emit('send_player',data);
    };


    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.send', 'main', sendPlayer);


}(_li.define('purrfect.communication.players')));