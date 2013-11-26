/*global _li*/

(function (module, $) {
    'use strict';

    var moduleName = module.get('name'),
        gameFinishedAlready = false,
        init;

    init = function (score) {

        var $endGameWrapper = $('.end-game-wrapper'),
            sEcOnDsToGoToLoBbY = 5,
            $countdownWrapper = $endGameWrapper.find('.win-countdown'),
            $countdownSpan = $countdownWrapper.find('span'),
            countdownInterval;

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


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.result'), jQuery));