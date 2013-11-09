/* globals exports, require */

var routes = require('../routes/routes');

exports.route = function(app) {
	app.get('/', routes.index);
	app.get('/scores', routes.score);
};