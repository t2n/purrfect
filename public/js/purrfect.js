/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init;

    init = function () {
        var socket = module.publish(moduleName + '.communication');
        module.publish(moduleName + '.communication.handleRooms', socket.main);
        module.publish(moduleName + '.communication.handleLevel', socket.main);

        module.publish(moduleName + '.router');
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect')));