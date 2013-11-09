/* globals exports */

exports.handleConnection = function(socket) {
	socket.emit('hello', 'hai mate!');
};