/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        assets = ['/spine/skeleton.atlas', '/spine/skeleton.json'],
        loaded,
        init;

    init = function () {
        var loader = new PIXI.AssetLoader(assets);
        loader.onComplete = loaded;
        loader.load();
    };

    loaded = function () {
        module.publish('purrfect.view.game.render.prepare');
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.assets'), PIXI));