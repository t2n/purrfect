/* globals exports, require */
var _ = require('lodash');

var defaults = {
	ledgesCount: Math.floor(Math.random() * (600 - 400 + 1)) + 400
};

exports.generate = function(config) {
	var lCount;
	config = config || {};
	_.defaults(config, defaults);

	lCount = config.ledgesCount;

	var level = [];
	var line = [];

	for (var i = 0; i<lCount; i+=1) {
		for (var n = 0; n<10; n+=1) {
			line.push(Math.round(Math.random()));
		}
		level.push(line);
		line = [];
	}

	return level;
};