/*global _li*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        init;

    init = function () {
        var data = {
            path: '/template/game.handlebars',
            event: moduleName + '.render'
        };

		module.publish('purrfect.fpsmeter');
        module.publish('purrfect.view.renderTemplate', data);
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game')));