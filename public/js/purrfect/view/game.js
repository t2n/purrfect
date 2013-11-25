/*global _li*/

(function (module, $) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        showEndGame,
        gameFinishedAlready = false;

    init = function () {
        var data = {
            path: '/template/game.handlebars',
            event: moduleName + '.render'
        };

        module.publish('purrfect.view.renderTemplate', data);

    };

    showEndGame = function (score) {
        var $endGameWrapper = $('.end-game-wrapper');
        var sEcOnDsToGoToLoBbY = 10;
        var $countdownWrapper = $endGameWrapper.find('.win-countdown');
        var $countdownSpan = $countdownWrapper.find('span');
        var countdownInterval;

        $endGameWrapper.show();
        $endGameWrapper.find('.name-container').html('Score: ' + score);
        if (!gameFinishedAlready) {
            gameFinishedAlready = true;
            countdownInterval = setInterval(function () {
                $countdownSpan.html(sEcOnDsToGoToLoBbY -= 1);

                if (sEcOnDsToGoToLoBbY < 0) {
                    $countdownSpan.addClass('lol');
                }

                if (sEcOnDsToGoToLoBbY === -3) {
                    clearInterval(countdownInterval);
                    $countdownWrapper.text('Just kidding LOL. Gogo!');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
            }, 1000);
        }
    };

    module.subscribe(moduleName + '.showEndGame', 'main', showEndGame);
    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game'), jQuery));