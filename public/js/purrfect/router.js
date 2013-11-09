/*global _li, console, jQuery*/

(function (module, $, window) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        event,
        hashValue,
        game,
        home,
        result;

    init = function () {
        event();
    };

    event = function () {
        $(window).on('hashchange', function () {
            hashValue = window.location.href.split('#')[1];
            
            if (hashValue === 'game') {
                game();
            }
            else if (hashValue === 'result') {
                result();
            }
            else {
                home();
            }
        });
    };

    game = function() {
        module.publish('purrfect.view.game');
    };

    result = function() {
        module.publish('purrfect.view.result');
    };

    home = function() {
        module.publish('purrfect.view.home');
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.router'), jQuery, window));