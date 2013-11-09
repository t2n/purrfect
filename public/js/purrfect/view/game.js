/*global _li*/

(function(module) {
	'use strict';

	var moduleName = module.get('name'),
		render,
		init;

	init = function() {
		var data = {
			path: '/template/game.handlebars',
			event: null
		};

		module.publish('purrfect.view.renderTemplate', data);
	};

	render = function () {
        module.publish(moduleName + '.render');
    };

	module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game')));