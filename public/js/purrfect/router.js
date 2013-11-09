/*global _li, console, jQuery*/

(function (module, $) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        event;

    init = function () {
        event();
    };

    event = function () {
        $(window).on('hashchange', function (route) {
            console.log(route);
        });
    };


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.router'), jQuery));