/*global _li, jQuery*/

(function(module, jQuery) {
	'use strict';

	var moduleName = module.get('name'),
		init,
        handleLobbyCount,
        handleRooms;

	init = function() {
		var data = {
			path: '/template/home.handlebars',
			event: 'purrfect.communication.handleRooms.getRooms'
		};

        jQuery('body').on('click','a', function(e) {
            e.preventDefault();

            var chosenRoom = jQuery(this).attr('data-id');

            module.publish('purrfect.communication.handleRooms.joinRoom', chosenRoom);
        });

		module.publish('purrfect.view.renderTemplate', data);
	};

    handleLobbyCount = function(count) {
        var $lobby = jQuery('.in-lobby > span');
        $lobby.text(count);
    };

    handleRooms = function(rooms) {
        var $rooms = jQuery('.rooms-wrapper .room'),
            roomClass = '',
            $currRoom;

        for (var i = 0; i < rooms.length; i+=1) {
            roomClass = '.' + rooms[i].name;
            $currRoom = $rooms.filter(roomClass);

            /*TODO add loader*/
            if (rooms[i].visible) {
                $currRoom.show();
                $currRoom.find('a').text(rooms[i].connected + '/' + rooms[i].maxPlayers)
                    .attr('data-id', rooms[i].name);

                if (rooms[i].inProgress) {
                    $currRoom.find('a').addClass('full');
                } else {
                    $currRoom.find('a').removeClass('full');
                }
            } else {
                $currRoom.hide();
            }
        }
    };

	module.subscribe(moduleName, 'main', init);
    module.subscribe('purrfect.view.home.handleRooms', 'rooms', handleRooms);
    module.subscribe('purrfect.view.home.handleLobbyCount', 'count', handleLobbyCount);

}(_li.define('purrfect.view.home'), jQuery));