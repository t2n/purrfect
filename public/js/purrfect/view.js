/*global _li*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        cleanup,
        init;

    init = function () {

    };

    cleanup = function () {

    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.cleanup', 'main', cleanup);

}(_li.define('purrfect.view')));