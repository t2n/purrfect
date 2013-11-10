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
            event: 'purrfect.communication.handleRooms.getRooms'
        };

        jQuery('body').on('click', 'a', function (e) {
            var $inputName = jQuery('.nickname-wrapper input'),
                chosenRoom;

            e.preventDefault();
            chosenRoom = jQuery(this).attr('data-id');
            if (/[a-zA-Z0-9\-]/.test($inputName.val())) {
                $inputName.removeClass('error');
                module.publish('purrfect.cache.set', {key: 'playerName', value: $inputName.val()});
                module.publish('purrfect.communication.all.joinRoom', chosenRoom);
            } else {
                $inputName.addClass('error');
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

    handleRooms = function (rooms) {
        var $rooms = jQuery('.rooms-wrapper .room'),
            roomClass = '',
            $currRoom;

        for (var room in rooms) {
            if (rooms.hasOwnProperty(room)) {
                var currentRoom = rooms[room];
                roomClass = '.' + currentRoom.name;
                $currRoom = $rooms.filter(roomClass);

                /*TODO add loader*/
                if (currentRoom.visible) {
                    $currRoom.show();
                    $currRoom.find('a').html(currentRoom.connected + '/' + currentRoom.maxPlayers + "<br/><span>players</span>" )
                        .attr('data-id', currentRoom.name);

                    if (currentRoom.inProgress) {
                        $currRoom.find('a').addClass('full');
                    } else {
                        $currRoom.find('a').removeClass('full');
                    }
                } else {
                    $currRoom.hide();
                }
            }
        }
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe('purrfect.view.home.handleRooms', 'rooms', handleRooms);
    module.subscribe('purrfect.view.home.handleLobbyCount', 'count', handleLobbyCount);

}(_li.define('purrfect.view.home'), jQuery)
    )
;