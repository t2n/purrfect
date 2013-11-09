/*global _li, io, location*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        socket = null,
        init;

    init = function () {
        if (!socket) {
            socket = io.connect(location.origin);
        }

        return socket;
    };

    module.subscribe(moduleName, 'main', init);


}(_li.define('purrfect.communication')));