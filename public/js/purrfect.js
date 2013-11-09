/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init;

    init = function () {
        var socket = module.publish(moduleName + '.communication');

        module.publish(moduleName + '.communication.all', socket.main);
        module.publish(moduleName + '.communication.all.loadRooms');

        module.publish(moduleName + '.router');
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect')));