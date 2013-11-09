/*global _li, PIXI, jQuery*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        canvas,
        container,
        stage,
        renderer,
        loop,
        prepare,
        init;

    init = function () {
        module.publish('purrfect.view.game.assets');
    };

    prepare = function () {
        canvas();
        renderer();
        container();
        stage();
        module.publish('purrfect.view.game.player.add', {id: 123, isMe: true});
        module.publish('purrfect.view.game.ledge');
        loop();
    };

    canvas = function () {
        var canvas = document.querySelector('#canvas');
        module.publish('purrfect.cache.set', {key: 'gameCanvas', value: canvas});

    };

    container = function () {
        var container = new PIXI.DisplayObjectContainer();
        module.publish('purrfect.cache.set', {key: 'gameContainer', value: container});

    };

    renderer = function () {
        var canvas = module.publish('purrfect.cache.get', 'gameCanvas'),
            renderer = PIXI.autoDetectRenderer(800, 600, canvas.cached);

        module.publish('purrfect.cache.set', {key: 'gameRenderer', value: renderer});
    };

    stage = function () {
        var stage = new PIXI.Stage(0xFFFFFF),
            container = module.publish('purrfect.cache.get', 'gameContainer').cached;

        stage.addChild(container);

        module.publish('purrfect.cache.set', {key: 'gameStage', value: stage});
    };

    loop = function () {
        module.publish('purrfect.view.game.loop');
    };


    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.prepare', 'main', prepare);

}(_li.define('purrfect.view.game.render'), PIXI));