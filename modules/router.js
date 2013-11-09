/* globals exports, require */

var routes = require('../routes');
var user = require('../routes/user');

exports.route = function(app) {
	app.get('/', routes.index);
	app.get('/users', user.list);
};