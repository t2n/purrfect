/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        stage,
        renderer,
        loop,
        init;

    init = function () {
        renderer();
        stage();
        loop();
    };

    renderer = function () {
        var canvas = module.publish('purrfect.cache.get', 'gameCanvas'),
            renderer = PIXI.autoDetectRenderer(800, 600, canvas.cached);

        module.publish('purrfect.cache.set', {gameRenderer: renderer});
    };

    stage = function () {
        var stage = new PIXI.Stage(0xFFFFFF);

        module.publish('purrfect.cache.set', {gameStage: stage});
    };

    loop = function () {
        module.publish('purrfect.view.game.loop');
    };


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.render'), PIXI));