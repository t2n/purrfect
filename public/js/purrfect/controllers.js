/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init;

    init = function () {
        module.publish(moduleName + '.keyboard');
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.controllers')));