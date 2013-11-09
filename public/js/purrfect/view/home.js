/*global _li, jQuery*/

(function(module, jQuery) {
	'use strict';

	var moduleName = module.get('name'),
		init,
        handleRooms,
        isRoomPublished = false;

	init = function() {
		var data = {
			path: '/template/home.handlebars',
			event: 'purrfect.communication.handleRooms.getRooms'
		};

		module.publish('purrfect.view.renderTemplate', data);
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

        $rooms.find('a').click(function(e) {
            e.preventDefault();

            var chosenRoom = jQuery(this).attr('data-id');

            if (!isRoomPublished) {
                module.publish('purrfect.communication.handleRooms.joinRoom', chosenRoom);
                isRoomPublished = true;
            }
        });
    };

	module.subscribe(moduleName, 'main', init);
    module.subscribe('purrfect.view.home.handleRooms', 'rooms', handleRooms);

}(_li.define('purrfect.view.home'), jQuery));