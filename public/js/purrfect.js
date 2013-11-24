/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init;

    init = function () {
        module.publish('purrfect.cache.set', {key: 'myPlayer', value: 'player-' + '123' + '-' + +new Date()});
        module.publish(moduleName + '.router');
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect')));