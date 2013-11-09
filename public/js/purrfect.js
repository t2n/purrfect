/*global _li, console*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init;

    init = function () {
        console.log('This is ' + moduleName);
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect')));