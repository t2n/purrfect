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
        result,
        joinedGame = false,
        gameStarted;

    init = function() {
        event();
    };

    getHash = function() {
        return window.location.href.split('#')[1];
    };

    handleHash = function() {
        hashValue = getHash();

        if (hashValue === 'game' && joinedGame) {
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
        window.location.hash = '#game';
    };

    result = function() {
        module.publish('purrfect.view.result');
        window.location.hash = '#result';
    };

    home = function() {
        module.publish('purrfect.view.home');
        window.location.hash = '#home';
    };

    gameStarted = function() {
        joinedGame = true;
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe('purrfect.router.startGame', 'main', gameStarted);

}(_li.define('purrfect.router'), jQuery, window));