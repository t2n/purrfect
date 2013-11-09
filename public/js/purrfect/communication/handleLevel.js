/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        moduleSocket,
        handleLevel;

    init = function (socket) {
        moduleSocket = socket;
        moduleSocket.on('joined_room', handleLevel);
    };

    handleLevel = function (level) {
        module.publish('purrfect.cache.set', {key: 'gameLevel', value: level});
    };

    module.subscribe(moduleName, 'main', init);


}(_li.define('purrfect.communication.handleLevel')));