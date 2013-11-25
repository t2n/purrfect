/*global _li, jQuery*/

(function (module, $) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        validateInput,
        runGame,
        events,
        rumbleInput;


    init = function () {
        var data = {
            path: '/template/home.handlebars'
        };

        events();
        module.publish('purrfect.view.renderTemplate', data);
    };

    events = function () {
        var $body = $('body');

        $body.on('click', 'a', function (e) {
            validateInput();
            e.preventDefault();
        });

        $body.on('submit', 'form', function (e) {
            validateInput();
            e.preventDefault();
        });
    };

    runGame = function ($inputName, $catType) {

        var player = {
            name: $inputName.val(),
            avatarName: $catType.val()
        };

        module.publish('purrfect.cache.set', {key: 'playerData', value: player});

        module.publish('purrfect.view.game', player);
    };

    validateInput = function () {
        var $inputName = $('.nickname-wrapper input'),
            $catType = $('.nickname-wrapper select');


        $inputName.jrumble({
            x: 1,
            y: 1,
            speed: 100
        });

        if (/[a-zA-Z0-9\-]/.test($inputName.val())) {
            runGame($inputName, $catType);
        } else {
            rumbleInput($inputName);
        }
    };

    rumbleInput = function ($inputName) {
        $inputName.addClass('error');
        $inputName.trigger('startRumble');
        $inputName.hover(function () {
            $inputName.trigger('stopRumble');
            $inputName.removeClass('error');
        });
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.home'), jQuery));