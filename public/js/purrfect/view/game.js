/*global _li*/

(function (module, jQuery) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        showEndGame;

    init = function () {
        var data = {
            path: '/template/game.handlebars',
            event: moduleName + '.render'
        };

        if (module.publish('purrfect.cache.get', 'myPlayer').cached) {
            module.publish('purrfect.view.renderTemplate', data);
        } else {
            window.location.hash = '#home';
        }
    };

    showEndGame = function (name) {
        var $endGameWrapper = jQuery('.end-game-wrapper');

        $endGameWrapper.show();
        $endGameWrapper.find('.name-container').html(name);
    };

    module.subscribe(moduleName + '.showEndGame', 'main', showEndGame);
    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game'), jQuery));