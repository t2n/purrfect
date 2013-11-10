/*global _li, console, jQuery*/

(function(module, $, window) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        event,
        hashValue,
        handleHash,
        getHash,
        game,
        home,
        result;

    init = function() {
        event();
    };

    getHash = function() {
        return window.location.href.split('#')[1];
    };

    handleHash = function() {
        hashValue = getHash();

        if (hashValue === 'game') {
            game();
        } else if (hashValue === 'result') {
            result();
        } else {
            home();
        }
    };

    event = function() {
        handleHash();

        $(window).on('hashchange', function() {
            handleHash();
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