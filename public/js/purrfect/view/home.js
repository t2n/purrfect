/*global _li, jQuery*/

(function (module, jQuery) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        handleLobbyCount,
        handleRooms;

    init = function () {
        var data = {
            path: '/template/home.handlebars',
            event: null
        };

        jQuery('body').on('click', 'a', function (e) {
            var chosenRoom,
                $inputName = jQuery('.nickname-wrapper input'),
                $catType = jQuery('.nickname-wrapper select');


            $inputName.jrumble({
                x: 1,
                y: 1,
                speed: 100
            });

            e.preventDefault();
            chosenRoom = jQuery(this).attr('data-id');
            if (/[a-zA-Z0-9\-]/.test($inputName.val())) {
                $inputName.removeClass('error');
                $inputName.trigger('stopRumble');
                module.publish('purrfect.cache.set', {key: 'playerName', value: $inputName.val()});

                var data = {
                    room: {
                        name: 'room_2max',
                        connected: 1,
                        playerList: {},
                        maxPlayers: 1,
                        visible: true,
                        inProgress: true,
                        level: module.publish('purrfect.view.game.level').main,
                        powerups: module.publish('purrfect.view.game.powerup').main

                    },
                    startGame: true,
                    players: {
                        1: {
                            id: module.publish('purrfect.cache.get', 'myPlayer').cached,
                            name: $inputName.val(),
                            avatarName: $catType.val()
                        }
                    }
                };
                module.publish('purrfect.cache.set', {key: 'gameData', value: data});
                module.publish('purrfect.view.game', data);
            } else {
                $inputName.addClass('error');
                $inputName.trigger('startRumble');
                $inputName.hover(function () {
                    $inputName.trigger('stopRumble');
                    $inputName.removeClass('error');
                });
            }
        });
        module.publish('purrfect.view.renderTemplate', data);
    };

    handleLobbyCount = function (count) {
        var sandbox = function () {
            var $lobby = jQuery('.in-lobby > span');
            if (!$lobby[0]) {
                window.setTimeout(function () {
                    return sandbox();
                }, 200);
            } else {
                $lobby.text(count);
            }
            return $lobby;
        };
        sandbox();
    };


    module.subscribe(moduleName, 'main', init);
    module.subscribe('purrfect.view.home.handleLobbyCount', 'count', handleLobbyCount);

}(_li.define('purrfect.view.home'), jQuery));